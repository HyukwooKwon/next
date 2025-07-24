"use client";

import { useAudioStore } from "@/store/audioStore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    const response = await fetch("http://localhost:8080/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      useAudioStore.getState().setJwtToken(data.token);
      useAudioStore.getState().setPoints(data.points);

      alert("로그인 성공");
      router.push("/");
    } else {
      alert("로그인 실패: 이메일 또는 비밀번호를 확인하세요.");
    }
  };



  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
      <div className="md3-card p-8 w-full max-w-md">
        <h2 className="md3-headline-small text-primary text-center mb-6">
          로그인
        </h2>
        <input
          type="email"
          placeholder="이메일"
          className="w-full p-3 border rounded-lg md3-body-medium mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="비밀번호"
          className="w-full p-3 border rounded-lg md3-body-medium mb-6"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin} className="w-full md3-button-filled">
          로그인
        </button>

        <div className="mt-4 text-center md3-body-medium text-on-surface-variant">
          아직 계정이 없으신가요?{" "}
          <a href="/register" className="text-primary underline">
            회원가입
          </a>
        </div>

        <div className="mt-6 text-center">
          <p className="md3-body-medium text-on-surface-variant mb-4">
            또는 소셜 계정으로 간편 로그인
          </p>

          <div className="flex flex-col gap-3">
            <button
              className="md3-button-outlined flex justify-center items-center gap-2"
              onClick={() => router.push("http://localhost:8080/auth/google")}
            >
              <Image
                src="/assets/google-logo.png"
                alt="Google"
                width={96}
                height={24}
              />
              Google로 로그인
            </button>

            <button
              className="md3-button-outlined flex justify-center items-center gap-2"
              onClick={() => router.push("http://localhost:8080/auth/naver")}
            >
              <Image
                src="/assets/naver-logo.png"
                alt="Naver"
                width={96}
                height={24}
              />
              네이버로 로그인
            </button>

            <button
              className="md3-button-outlined flex justify-center items-center gap-2"
              onClick={() => router.push("http://localhost:8080/auth/kakao")}
            >
              <Image
                src="/assets/kakao-logo.png"
                alt="Kakao"
                width={96}
                height={24}
              />
              카카오로 로그인
            </button>
          </div>
        </div>
      </div>
    </div>
  );


}
