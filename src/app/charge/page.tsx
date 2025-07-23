"use client";
import PortOne from "@portone/browser-sdk/v2";
import { useAudioStore } from "@/store/audioStore";
import { useRouter } from "next/navigation";

export default function ChargePage() {
  const router = useRouter();
  const jwtToken = useAudioStore.getState().jwtToken;

  const handlePayment = async (
    paymentId: string,
    orderName: string,
    totalAmount: number,
    type: "point" | "subscription",
    points?: number
  ) => {
    const payment = await PortOne.requestPayment({
      storeId: process.env.NEXT_PUBLIC_PORTONE_STORE_ID!,
      paymentId,
      orderName,
      totalAmount,
      currency: "CURRENCY_KRW", // ✅ PortOne SDK에서 정확히 요구하는 타입
      payMethod: "CARD",
      customer: {
        fullName: "사용자이름",
      },
    });

    if (!payment || payment.code !== undefined) {
      // ✅ 명시적으로 payment undefined 처리
      alert(`결제 실패: ${payment?.message || "알 수 없는 오류 발생"}`);
      return;
    }

    if (type === "point" && points) {
      const verifyResponse = await fetch(
        "http://localhost:8080/api/payment/verify",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
          body: JSON.stringify({
            impUid: payment.paymentId,
            orderId: paymentId,
            points,
          }),
        }
      );

      if (verifyResponse.ok) {
        const currentPoints = useAudioStore.getState().points;
        useAudioStore.getState().setPoints(currentPoints + points);
        alert("충전 완료 및 포인트 추가됨!");
      } else {
        alert("포인트 추가 실패. 다시 시도해주세요.");
      }
    }

    if (type === "subscription") {
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
      } else {
        alert("구독 활성화 실패. 관리자에게 문의하세요.");
      }
    }

    router.push("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-96 p-4 border rounded shadow space-y-4">
        <h2 className="text-xl font-bold mb-2">💰 포인트 충전</h2>
        <button
          className="w-full p-2 bg-green-500 text-white rounded"
          onClick={() =>
            handlePayment(
              `point_${Date.now()}`,
              "500 포인트 충전",
              5000,
              "point",
              500
            )
          }
        >
          500P 충전 (₩5,000)
        </button>
        <button
          className="w-full p-2 bg-green-500 text-white rounded"
          onClick={() =>
            handlePayment(
              `point_${Date.now()}`,
              "1000 포인트 충전",
              9500,
              "point",
              1000
            )
          }
        >
          1,000P 충전 (₩9,500)
        </button>
        <button
          className="w-full p-2 bg-green-500 text-white rounded"
          onClick={() =>
            handlePayment(
              `point_${Date.now()}`,
              "2000 포인트 충전",
              18000,
              "point",
              2000
            )
          }
        >
          2,000P 충전 (₩18,000)
        </button>

        <h2 className="text-xl font-bold mb-2 pt-4">🚀 구독 서비스 결제</h2>
        <button
          className="w-full p-2 bg-blue-500 text-white rounded"
          onClick={() =>
            handlePayment(
              `sub_${Date.now()}`,
              "1개월 구독 결제",
              9900,
              "subscription"
            )
          }
        >
          1개월 구독 (₩9,900)
        </button>
        <button
          className="w-full p-2 bg-blue-500 text-white rounded"
          onClick={() =>
            handlePayment(
              `sub_${Date.now()}`,
              "3개월 구독 결제",
              27000,
              "subscription"
            )
          }
        >
          3개월 구독 (₩27,000)
        </button>
        <button
          className="w-full p-2 bg-blue-500 text-white rounded"
          onClick={() =>
            handlePayment(
              `sub_${Date.now()}`,
              "1년 구독 결제",
              99000,
              "subscription"
            )
          }
        >
          1년 구독 (₩99,000)
        </button>
      </div>
    </div>
  );
}
