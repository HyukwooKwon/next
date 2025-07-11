"use client";
import { useRouter } from "next/navigation";

export default function ChargePage() {
    const router = useRouter();

    const handleCharge = (points: number) => {
        alert(`${points}P 충전 완료!`);
        router.push("/");
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-80 p-4 border rounded shadow">
                <h2 className="text-xl font-bold mb-4">포인트 충전</h2>
                <button
                    className="mb-2 w-full p-2 bg-green-500 text-white rounded"
                    onClick={() => handleCharge(500)}
                >
                    500P 충전 (₩5,000)
                </button>
                <button
                    className="mb-2 w-full p-2 bg-green-500 text-white rounded"
                    onClick={() => handleCharge(1000)}
                >
                    1,000P 충전 (₩9,500)
                </button>
                <button
                    className="w-full p-2 bg-green-500 text-white rounded"
                    onClick={() => handleCharge(2000)}
                >
                    2,000P 충전 (₩18,000)
                </button>
            </div>
        </div>
    );
}
