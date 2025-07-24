"use client";
import { useAudioStore } from "@/store/audioStore";
import PortOne from "@portone/browser-sdk/v2";
import { useRouter } from "next/navigation";
import { useState } from "react";

// 직접 정의한 정확한 타입 (PortOne SDK 문서 기반)
type PgProvider =
  | "PG_PROVIDER_TOSSPAYMENTS"
  | "PG_PROVIDER_INICIS"
  | "PG_PROVIDER_NICE"
  | "PG_PROVIDER_KAKAOPAY"
  | "PG_PROVIDER_NAVERPAY";

export default function ChargePage() {
  const router = useRouter();
  const jwtToken = useAudioStore.getState().jwtToken;

  // PG사 선택 기본값 설정
  const [selectedPG, setSelectedPG] = useState<PgProvider>(
    "PG_PROVIDER_TOSSPAYMENTS"
  );

  const handlePayment = async (
    paymentId: string,
    orderName: string,
    totalAmount: number,
    type: "point" | "subscription",
    points?: number
  ) => {
    const payment = await PortOne.requestPayment({
      storeId: process.env.NEXT_PUBLIC_PORTONE_STORE_ID!,
      pgProvider: selectedPG, // 정확히 타입 맞춤
      paymentId,
      orderName,
      totalAmount,
      currency: "CURRENCY_KRW", // 공식 문서 기준 정확한 ISO 코드
      payMethod: "CARD",
      customer: {
        fullName: "사용자이름",
      },
    });

    if (!payment || payment.code !== undefined) {
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50 p-4">
      <div className="md3-card max-w-lg w-full p-6 space-y-6">
        <h2 className="md3-headline-small text-primary text-center">
          💰 포인트 충전 및 구독 결제
        </h2>

        <select
          className="w-full p-3 border rounded-lg md3-body-medium"
          value={selectedPG}
          onChange={(e) => setSelectedPG(e.target.value as PgProvider)}
        >
          <option value="PG_PROVIDER_TOSSPAYMENTS">토스페이먼츠</option>
          <option value="PG_PROVIDER_INICIS">KG이니시스</option>
          <option value="PG_PROVIDER_NICE">나이스페이먼츠</option>
          <option value="PG_PROVIDER_KAKAOPAY">카카오페이</option>
          <option value="PG_PROVIDER_NAVERPAY">네이버페이</option>
        </select>

        <div className="grid grid-cols-1 gap-4">
          {[500, 1000, 2000].map((p) => (
            <button
              key={p}
              className="md3-button-filled"
              onClick={() =>
                handlePayment(
                  `point_${Date.now()}`,
                  `${p} 포인트 충전`,
                  p * 10 - (p >= 1000 ? p * 0.5 : 0),
                  "point",
                  p
                )
              }
            >
              {p.toLocaleString()}P 충전 (₩
              {(p * 10 - (p >= 1000 ? p * 0.5 : 0)).toLocaleString()})
            </button>
          ))}
        </div>

        <h2 className="md3-title-large text-secondary text-center mt-8">
          🚀 구독 서비스 결제
        </h2>

        <div className="grid grid-cols-1 gap-4">
          {[
            { months: 1, price: 9900 },
            { months: 3, price: 27000 },
            { months: 12, price: 99000 },
          ].map((sub) => (
            <button
              key={sub.months}
              className="md3-button-tonal"
              onClick={() =>
                handlePayment(
                  `sub_${Date.now()}`,
                  `${sub.months}개월 구독 결제`,
                  sub.price,
                  "subscription"
                )
              }
            >
              {sub.months}개월 구독 (₩{sub.price.toLocaleString()})
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
