"use client";
import { useAudioStore } from "@/store/audioStore";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [language, setLanguage] = useState("");
  const jwtToken = useAudioStore((state) => state.jwtToken);

  const handleLogin = () => router.push("/login"); // 로그인 페이지로 이동
  const handleRegister = () => router.push("/register");
  const handleCharge = () => router.push("/charge");

  const startStudy = () => {
    if (!jwtToken) {
      alert("로그인이 필요합니다.");
      router.push("/login"); // 로그인하지 않았으면 로그인 페이지로 이동
      return;
    }
    if (!language) {
      alert("언어를 선택해주세요.");
      return;
    }
    router.push(`/study?lang=${language}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-8">AI 음성 학습 서비스</h1>

      <div className="mb-6">
        {!jwtToken ? (
          <>
            <button
              className="mr-4 px-4 py-2 bg-blue-500 text-white rounded"
              onClick={handleLogin}
            >
              로그인
            </button>
            <button
              className="px-4 py-2 bg-gray-300 rounded"
              onClick={handleRegister}
            >
              회원가입
            </button>
          </>
        ) : (
          <div className="mb-4">
            <span className="mr-4">로그인됨</span>
            <button
              className="px-4 py-2 bg-yellow-500 text-white rounded"
              onClick={handleCharge}
            >
              포인트 충전
            </button>
          </div>
        )}
      </div>

      <select
        className="mb-4 px-4 py-2 border rounded"
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
      >
        <option value="">언어 선택</option>
        <option value="company1051">영어</option>
        <option value="company1052">한국어</option>
        <option value="company1054">일본어</option>
        <option value="company1053">중국어</option>
        <option value="company1055">스페인어</option>
      </select>

      <button
        className="px-6 py-3 bg-green-500 text-white rounded"
        onClick={startStudy}
      >
        학습 시작하기
      </button>
    </div>
  );
}
