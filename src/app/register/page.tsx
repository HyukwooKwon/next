"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("http://localhost:8080/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
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
    <div className="min-h-screen flex items-center justify-center">
      <form
        className="w-80 p-4 border rounded shadow"
        onSubmit={handleRegister}
      >
        <h2 className="text-xl font-bold mb-4">회원가입</h2>
        <input
          className="mb-2 w-full p-2 border rounded"
          placeholder="이메일"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="mb-2 w-full p-2 border rounded"
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          가입하기
        </button>
      </form>
    </div>
  );
}
