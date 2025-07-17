"use client";
import { useRouter } from "next/navigation";
import { useAudioStore } from "@/store/audioStore";

export default function SubscriptionPage() {
  const router = useRouter();
  const jwtToken = useAudioStore((state) => state.jwtToken);

  const handleSubscriptionStart = async () => {
    const res = await fetch("http://localhost:8080/subscription/start", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });

    if (res.ok) {
      useAudioStore.getState().setSubscriptionActive(true);
      alert("구독이 시작되었습니다!");
      router.push("/");
    } else {
      alert("구독 시작에 실패했습니다.");
    }
  };

  const handleSubscriptionCancel = async () => {
    const res = await fetch("http://localhost:8080/subscription/cancel", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });

    if (res.ok) {
      useAudioStore.getState().setSubscriptionActive(false);
      alert("구독이 취소되었습니다.");
      router.push("/");
    } else {
      alert("구독 취소에 실패했습니다.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-80 p-4 border rounded shadow">
        <h2 className="text-xl font-bold mb-4">구독 관리</h2>
        <button
          className="mb-2 w-full p-2 bg-green-500 text-white rounded"
          onClick={handleSubscriptionStart}
        >
          구독 시작하기
        </button>
        <button
          className="w-full p-2 bg-red-500 text-white rounded"
          onClick={handleSubscriptionCancel}
        >
          구독 취소하기
        </button>
      </div>
    </div>
  );
}
