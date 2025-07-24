"use client";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 py-16 px-4">
      <div className="max-w-4xl mx-auto md3-card p-10">
        <h1 className="md3-display-medium text-primary text-center mb-8">
          LinguaAI 요금제 안내
        </h1>

        <section className="mb-8">
          <h2 className="md3-headline-small text-secondary mb-4">
            🎯 포인트 충전
          </h2>
          <ul className="md3-body-large text-on-surface-variant space-y-2">
            <li>500P 충전 - ₩5,000</li>
            <li>1,000P 충전 - ₩9,500 (₩500 할인)</li>
            <li>2,000P 충전 - ₩18,000 (₩2,000 할인)</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="md3-headline-small text-secondary mb-4">
            📅 월정액 구독 서비스
          </h2>
          <ul className="md3-body-large text-on-surface-variant space-y-2">
            <li>1개월 구독 - ₩9,900</li>
            <li>3개월 구독 - ₩27,000 (월 ₩9,000)</li>
            <li>1년 구독 - ₩99,000 (월 ₩8,250)</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="md3-headline-small text-secondary mb-4">
            ✅ 결제 방법
          </h2>
          <p className="md3-body-large text-on-surface-variant">
            토스페이먼츠, KG이니시스, 나이스페이먼츠, 카카오페이, 네이버페이 등
            다양한 결제 수단을 지원하여 편리하게 결제할 수 있습니다.
          </p>
        </section>

        <section>
          <h2 className="md3-headline-small text-secondary mb-4">
            📌 환불 정책
          </h2>
          <p className="md3-body-large text-on-surface-variant">
            포인트 충전 및 구독 결제 후 7일 이내 미사용 상태에서 환불
            가능합니다. 보다 자세한 사항은 환불정책 페이지를 참고해 주세요.
          </p>
        </section>
      </div>
    </div>
  );
}
