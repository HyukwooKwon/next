"use client";
import { useState, useRef } from "react";

export default function BeginnerStudyPage() {
  const [userText, setUserText] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [recording, setRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;
    audioChunksRef.current = [];

    mediaRecorder.ondataavailable = (event) => {
      audioChunksRef.current.push(event.data);
    };

    mediaRecorder.start();
    setRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    mediaRecorderRef.current!.onstop = async () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });
      const formData = new FormData();
      formData.append("audio_file", audioBlob, "audio.wav");

      const response = await fetch("http://localhost:8080/stt_chat", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setUserText(data.user_text);
        setAiResponse(data.ai_response);
      } else {
        alert("음성 처리 중 오류 발생");
      }
    };
    setRecording(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h2 className="text-2xl font-bold">🗣️ 초보자용 AI 음성 학습</h2>

      {!recording ? (
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded my-4"
          onClick={startRecording}
        >
          🎤 음성 녹음 시작
        </button>
      ) : (
        <button
          className="px-4 py-2 bg-red-500 text-white rounded my-4"
          onClick={stopRecording}
        >
          ■ 녹음 종료
        </button>
      )}

      <textarea
        className="w-full max-w-lg h-32 p-4 border rounded mb-4"
        value={userText}
        onChange={(e) => setUserText(e.target.value)}
        placeholder="음성 변환된 텍스트가 여기에 표시됩니다"
      />

      <button
        className="px-4 py-2 bg-green-500 text-white rounded"
        onClick={async () => {
          const response = await fetch("http://localhost:8080/text_chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: userText }),
          });

          if (response.ok) {
            const data = await response.json();
            setAiResponse(data.response);
          } else {
            alert("AI 요청 중 오류 발생");
          }
        }}
      >
        🚀 AI에게 전달하기
      </button>

      <div className="w-full max-w-lg mt-4 p-4 bg-gray-100 rounded shadow">
        <strong>AI 응답:</strong>
        <p>{aiResponse}</p>
        <button
          className="mt-2 px-4 py-2 bg-purple-500 text-white rounded"
          onClick={async () => {
            const ttsResponse = await fetch("http://localhost:8080/tts", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ text: aiResponse }),
            });
            if (ttsResponse.ok) {
              const audioBlob = await ttsResponse.blob();
              const audioUrl = URL.createObjectURL(audioBlob);
              const audio = new Audio(audioUrl);
              audio.play();
            }
          }}
        >
          ▶️ 음성 듣기
        </button>
      </div>
    </div>
  );
}
