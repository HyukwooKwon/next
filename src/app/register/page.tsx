"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    // 프로필 데이터를 profile_data 형태로 수정
    const response = await fetch("http://localhost:8080/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
        profile_data: {
          default: {
            name,
            phone,
          },
        },
      }),
    });

    if (response.ok) {
      alert("회원가입 완료! 로그인해주세요.");
      router.push("/login");
    } else {
      const errorData = await response.json();
      alert("회원가입 실패: " + errorData.detail);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
      <form className="md3-card p-8 w-full max-w-md" onSubmit={handleRegister}>
        <h2 className="md3-headline-small text-primary text-center mb-6">
          회원가입
        </h2>
        <input
          className="w-full p-3 border rounded-lg md3-body-medium mb-4"
          placeholder="이름"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          className="w-full p-3 border rounded-lg md3-body-medium mb-4"
          placeholder="전화번호 (예: 010-1234-5678)"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <input
          className="w-full p-3 border rounded-lg md3-body-medium mb-4"
          placeholder="이메일"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="w-full p-3 border rounded-lg md3-body-medium mb-4"
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          className="w-full p-3 border rounded-lg md3-body-medium mb-6"
          type="password"
          placeholder="비밀번호 확인"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit" className="w-full md3-button-filled">
          가입하기
        </button>

        <div className="mt-4 text-center md3-body-medium text-on-surface-variant">
          이미 계정이 있으신가요?{" "}
          <a href="/login" className="text-primary underline">
            로그인
          </a>
        </div>

        <div className="mt-6 text-center">
          <p className="md3-body-medium text-on-surface-variant mb-4">
            또는 소셜 계정으로 간편 가입
          </p>

          <div className="flex flex-col gap-3">
            <button
              className="md3-button-outlined flex justify-center items-center gap-2"
              onClick={() => router.push("http://localhost:8080/auth/google")}
              type="button"
            >
              <Image
                src="/assets/google-logo.png"
                alt="Google"
                width={96}
                height={24}
              />
              Google로 가입
            </button>

            <button
              className="md3-button-outlined flex justify-center items-center gap-2"
              onClick={() => router.push("http://localhost:8080/auth/naver")}
              type="button"
            >
              <Image
                src="/assets/naver-logo.png"
                alt="Naver"
                width={96}
                height={24}
              />
              네이버로 가입
            </button>

            <button
              className="md3-button-outlined flex justify-center items-center gap-2"
              onClick={() => router.push("http://localhost:8080/auth/kakao")}
              type="button"
            >
              <Image
                src="/assets/kakao-logo.png"
                alt="Kakao"
                width={96}
                height={24}
              />
              카카오로 가입
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
