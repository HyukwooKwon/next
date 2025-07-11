"use client";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const router = useRouter();

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        alert("회원가입 완료! 로그인해주세요.");
        router.push("/");
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
                    placeholder="아이디"
                    required
                />
                <input
                    className="mb-2 w-full p-2 border rounded"
                    type="password"
                    placeholder="비밀번호"
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
