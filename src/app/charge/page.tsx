"use client";
import { useAudioStore } from "@/store/audioStore";
import { loadPaymentUI } from "@portone/browser-sdk/v2";
import { useRouter } from "next/navigation";

export default function ChargePage() {
  const router = useRouter();
  const jwtToken = useAudioStore.getState().jwtToken;

  const handlePointCharge = async (points: number, amount: number) => {
    await loadPaymentUI(
      {
        storeId: process.env.NEXT_PUBLIC_PORTONE_STORE_ID!,
        channelKey: process.env.NEXT_PUBLIC_PORTONE_CHANNEL_KEY!,
        paymentId: `point_${Date.now()}`,
        orderName: `${points} 포인트 충전`,
        totalAmount: amount,
        currency: "CURRENCY_KRW", // ISO 코드 기준 문자열
        customer: {
          fullName: "사용자이름", // 정확한 형태
        },
        uiType: "PAYPAL_SPB",
      },

      {
        onPaymentSuccess: async (response) => {
          const verifyResponse = await fetch(
            "http://localhost:8080/api/payment/verify",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwtToken}`,
              },
              body: JSON.stringify({
                impUid: response.paymentId,
                orderId: response.paymentId,
                points: points,
              }),
            }
          );

          if (verifyResponse.ok) {
            const currentPoints = useAudioStore.getState().points;
            useAudioStore.getState().setPoints(currentPoints + points);
            alert("충전 완료 및 포인트 추가됨!");
            router.push("/");
          } else {
            alert("포인트 추가 실패. 다시 시도해주세요.");
          }
        },
        onPaymentFail: (error) => {
          alert(`결제 실패: ${error.message}`);
        },
      }
    );
  };

  const handleSubscriptionPayment = async (plan: string, amount: number) => {
    await loadPaymentUI(
      {
        storeId: process.env.NEXT_PUBLIC_PORTONE_STORE_ID!,
        channelKey: process.env.NEXT_PUBLIC_PORTONE_CHANNEL_KEY!,
        paymentId: `sub_${Date.now()}`,
        orderName: `${plan} 구독 결제`, // ✅ points → plan으로 정확히 수정
        totalAmount: amount,
        currency: "CURRENCY_KRW",
        customer: {
          fullName: "사용자이름",
        },
        uiType: "PAYPAL_SPB",
      },
      {
        onPaymentSuccess: async () => {
          const subscriptionResponse = await fetch(
            "http://localhost:8080/subscription/start",
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${jwtToken}`,
              },
            }
          );

          if (subscriptionResponse.ok) {
            useAudioStore.getState().setSubscriptionActive(true);
            alert("구독 결제가 완료되어 구독이 시작되었습니다!");
            router.push("/");
          } else {
            alert("구독 활성화 실패. 관리자에게 문의하세요.");
          }
        },
        onPaymentFail: (error) => {
          alert(`결제 실패: ${error.message}`);
        },
      }
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-96 p-4 border rounded shadow space-y-4">
        <h2 className="text-xl font-bold mb-2">💰 포인트 충전</h2>
        <button
          className="w-full p-2 bg-green-500 text-white rounded"
          onClick={() => handlePointCharge(500, 5000)}
        >
          500P 충전 (₩5,000)
        </button>
        <button
          className="w-full p-2 bg-green-500 text-white rounded"
          onClick={() => handlePointCharge(1000, 9500)}
        >
          1,000P 충전 (₩9,500)
        </button>
        <button
          className="w-full p-2 bg-green-500 text-white rounded"
          onClick={() => handlePointCharge(2000, 18000)}
        >
          2,000P 충전 (₩18,000)
        </button>

        <h2 className="text-xl font-bold mb-2 pt-4">🚀 구독 서비스 결제</h2>
        <button
          className="w-full p-2 bg-blue-500 text-white rounded"
          onClick={() => handleSubscriptionPayment("1개월", 9900)}
        >
          1개월 구독 (₩9,900)
        </button>
        <button
          className="w-full p-2 bg-blue-500 text-white rounded"
          onClick={() => handleSubscriptionPayment("3개월", 27000)}
        >
          3개월 구독 (₩27,000)
        </button>
        <button
          className="w-full p-2 bg-blue-500 text-white rounded"
          onClick={() => handleSubscriptionPayment("1년", 99000)}
        >
          1년 구독 (₩99,000)
        </button>
      </div>
    </div>
  );
}
