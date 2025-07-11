"use client";
import { useSearchParams } from "next/navigation";
import { Suspense, useRef, useState } from "react";

type ChatMessage = {
  type: "user" | "ai";
  message: string;
};

function PageContent() {
  const searchParams = useSearchParams();
  const companyId = searchParams.get("lang");

  const [isConnected, setIsConnected] = useState(false);
  const [, setIsSpeaking] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [, setDebugMessages] = useState<string[]>([]);

  const wsRef = useRef<WebSocket | null>(null);
  const streamIdRef = useRef(`browser-${Date.now()}`);
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioWorkletNodeRef = useRef<AudioWorkletNode | null>(null);

  const pcmBufferRef = useRef<Int16Array[]>([]);
  const pcmBufferSizeRef = useRef<number>(0);
  const isSpeakingRef = useRef(false);
  const inputPauseRef = useRef<boolean>(false);

  const BUFFER_DURATION_MS = 500;
  const BUFFER_SIZE_SAMPLES = (16000 * BUFFER_DURATION_MS) / 1000;

  const addDebugMessage = (msg: string) => {
    setDebugMessages((prev) => [...prev.slice(-4), msg]);
  };

  const connectWebSocket = () => {
    wsRef.current = new WebSocket(
      process.env.NEXT_PUBLIC_WEBSOCKET_URL ||
        "wss://gagell.ngrok.io/realtime_stream_webrtc"
    );

    wsRef.current.onopen = () => {
      setIsConnected(true);
      inputPauseRef.current = false;

      wsRef.current?.send(
        JSON.stringify({
          event: "start",
          start: {
            streamSid: streamIdRef.current,
            companyId: companyId,
          },
        })
      );
      addDebugMessage("✅ WebSocket 연결됨");

      // ✅ 최초 연결 즉시 빈 PCM 데이터를 전송하여 VAD 초기화 문제를 해결
      setTimeout(() => {
        const emptyPcm = new Int16Array(16000 * 0.1); // 0.1초(1600 samples) 분량의 빈 PCM 데이터
        const pcmBlob = new Blob([emptyPcm.buffer], {
          type: "application/octet-stream",
        });
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64Audio = (reader.result as string).split(",")[1];
          wsRef.current?.send(
            JSON.stringify({
              event: "media",
              streamSid: streamIdRef.current,
              media: { payload: base64Audio },
            })
          );
          addDebugMessage("✅ 최초 빈 PCM 데이터 전송 완료");
        };
        reader.readAsDataURL(pcmBlob);
      }, 500); // 0.5초 후에 실행하여 WebSocket 연결이 안정화된 후 전송
    };

    wsRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.event === "media") {
        const audioBytes = Uint8Array.from(atob(data.media.payload), (c) =>
          c.charCodeAt(0)
        );
        const audioBlob = new Blob([audioBytes], { type: "audio/wav" });
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);

        setIsSpeaking(true);
        isSpeakingRef.current = true;
        inputPauseRef.current = true;

        const aiText = data.media.text || "🔊 AI 음성 응답";
        setChatMessages((prev) => [...prev, { type: "ai", message: aiText }]);

        audio.play();

        audio.onended = () => {
          setIsSpeaking(false);
          isSpeakingRef.current = false;
          pcmBufferRef.current = [];
          pcmBufferSizeRef.current = 0;
          inputPauseRef.current = false;
          addDebugMessage("🔊 AI 발화 종료, 입력 허용됨");
        };
      }

      if (data.event === "stt_result" && data.stt_text) {
        setChatMessages((prev) => [
          ...prev,
          { type: "user", message: data.stt_text },
        ]);
      }
    };
  };

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
    });
    audioContextRef.current = new AudioContext({ sampleRate: 16000 });

    await audioContextRef.current.audioWorklet.addModule("/audio-processor.js");

    const source = audioContextRef.current.createMediaStreamSource(stream);
    const audioWorkletNode = new AudioWorkletNode(
      audioContextRef.current,
      "audio-processor"
    );
    audioWorkletNodeRef.current = audioWorkletNode;

    audioWorkletNode.port.onmessage = (event) => {
      if (isSpeakingRef.current || inputPauseRef.current) {
        pcmBufferRef.current = [];
        pcmBufferSizeRef.current = 0;
        return;
      }

      const inputBuffer = event.data;
      const pcmData = new Int16Array(inputBuffer.length);
      for (let i = 0; i < inputBuffer.length; i++) {
        pcmData[i] = Math.max(-1, Math.min(1, inputBuffer[i])) * 0x7fff;
      }

      pcmBufferRef.current.push(pcmData);
      pcmBufferSizeRef.current += pcmData.length;

      if (pcmBufferSizeRef.current >= BUFFER_SIZE_SAMPLES) {
        const mergedPcm = new Int16Array(pcmBufferSizeRef.current);
        let offset = 0;
        pcmBufferRef.current.forEach((chunk) => {
          mergedPcm.set(chunk, offset);
          offset += chunk.length;
        });

        const pcmBlob = new Blob([mergedPcm.buffer], {
          type: "application/octet-stream",
        });
        const reader = new FileReader();
        reader.onloadend = () => {
          if (wsRef.current?.readyState === WebSocket.OPEN) {
            const base64Audio = (reader.result as string).split(",")[1];
            wsRef.current.send(
              JSON.stringify({
                event: "media",
                streamSid: streamIdRef.current,
                media: { payload: base64Audio },
              })
            );
          } else {
            addDebugMessage("⚠️ WebSocket 닫힘");
          }
        };
        reader.readAsDataURL(pcmBlob);

        pcmBufferRef.current = [];
        pcmBufferSizeRef.current = 0;
      }
    };

    source.connect(audioWorkletNode);
    audioWorkletNode.connect(audioContextRef.current.destination);
    addDebugMessage("🎤 녹음 시작");
  };

  const disconnect = () => {
    wsRef.current?.close();
    setIsConnected(false);
    audioContextRef.current?.close();
    audioWorkletNodeRef.current?.disconnect();
    setChatMessages([]);
    setDebugMessages([]);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 space-y-4">
      <h2 className="text-2xl font-bold">🗣️ AI 음성 학습 서비스</h2>
      {!isConnected ? (
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={connectWebSocket}
        >
          연결하기
        </button>
      ) : (
        <div className="space-x-2">
          <button
            className="px-4 py-2 bg-green-500 text-white rounded"
            onClick={startRecording}
          >
            녹음 시작
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded"
            onClick={disconnect}
          >
            연결 해제
          </button>
        </div>
      )}
      <div className="w-full max-w-3xl border rounded-xl p-6 bg-gray-100 overflow-y-auto max-h-[600px] shadow-lg">
        {chatMessages.map((chat, index) => (
          <div
            key={index}
            className={`mb-3 p-3 rounded-xl text-lg ${
              chat.type === "user"
                ? "bg-blue-300 text-right ml-auto max-w-[80%]"
                : "bg-green-300 text-left mr-auto max-w-[80%]"
            }`}
          >
            {chat.message}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function StudyPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PageContent />
    </Suspense>
  );
}
