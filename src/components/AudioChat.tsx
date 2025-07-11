"use client"; // 반드시 추가해야 합니다.
import { useRef, useState } from "react";

export default function AudioChat() {
    const [isConnected, setIsConnected] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [sttResult, setSttResult] = useState("");
    const [debugMessages, setDebugMessages] = useState<string[]>([]);
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
                        companyId:
                            process.env.NEXT_PUBLIC_COMPANY_ID || "company1051",
                    },
                })
            );
            addDebugMessage("✅ WebSocket 연결됨");
        };

        wsRef.current.onmessage = (event) => {
            const data = JSON.parse(event.data);

            if (data.event === "media") {
                const audioBytes = Uint8Array.from(
                    atob(data.media.payload),
                    (c) => c.charCodeAt(0)
                );
                const audioBlob = new Blob([audioBytes], { type: "audio/wav" });
                const audioUrl = URL.createObjectURL(audioBlob);
                const audio = new Audio(audioUrl);

                setIsSpeaking(true);
                isSpeakingRef.current = true;
                inputPauseRef.current = true;
                audio.play();

                audio.onended = () => {
                    setIsSpeaking(false);
                    isSpeakingRef.current = false;

                    pcmBufferRef.current = [];
                    pcmBufferSizeRef.current = 0;
                    addDebugMessage("🔊 AI 발화 종료 직후 버퍼 초기화 완료");

                    setTimeout(() => {
                        inputPauseRef.current = false;
                        addDebugMessage("✅ 2초 대기 후 입력 허용됨");
                    }, 2000);
                };
            }

            if (data.event === "stt_result" && data.stt_text) {
                setSttResult(data.stt_text);
                addDebugMessage(`📝 STT 결과: ${data.stt_text}`);
            }
        };
    };

    const startRecording = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
        });
        audioContextRef.current = new AudioContext({ sampleRate: 16000 });

        await audioContextRef.current.audioWorklet.addModule(
            "/audio-processor.js"
        );

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
                addDebugMessage(
                    "🚫 AI 발화 중 또는 입력 대기 중: 버퍼 즉시 초기화"
                );
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
                    const base64Audio = (reader.result as string).split(",")[1];
                    wsRef.current?.send(
                        JSON.stringify({
                            event: "media",
                            streamSid: streamIdRef.current,
                            media: { payload: base64Audio },
                        })
                    );
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
        setIsSpeaking(false);
        setDebugMessages([]);
    };

    return (
        <div>
            {!isConnected ? (
                <button onClick={connectWebSocket}>연결하기</button>
            ) : (
                <>
                    <button onClick={startRecording}>녹음 시작</button>
                    <button onClick={disconnect}>연결 해제</button>
                    {isSpeaking && <p>AI 응답 중...</p>}
                    {sttResult && <p>STT: {sttResult}</p>}
                    <div>
                        {debugMessages.map((msg, idx) => (
                            <p key={idx}>{msg}</p>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
