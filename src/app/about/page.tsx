"use client";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-16 px-4">
      <div className="max-w-4xl mx-auto md3-card p-10">
        <h1 className="md3-display-medium text-primary text-center mb-8">
          LinguaAI 서비스 소개
        </h1>

        <section className="mb-8">
          <h2 className="md3-headline-small text-secondary mb-4">
            🌐 서비스 개요
          </h2>
          <p className="md3-body-large text-on-surface-variant">
            LinguaAI는 최신 인공지능 기술을 활용하여 사용자에게 실시간 음성
            기반의 외국어 학습을 제공합니다. 언제 어디서나 AI 튜터와 자유롭게
            대화하며 자연스러운 외국어 회화 능력을 키울 수 있는 혁신적인
            플랫폼입니다.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="md3-headline-small text-secondary mb-4">
            🚀 우리의 미션
          </h2>
          <p className="md3-body-large text-on-surface-variant">
            우리의 목표는 외국어 학습의 장벽을 낮추고, AI 기술을 통해 모든
            사용자가 빠르고 효과적으로 언어를 습득할 수 있도록 지원하는
            것입니다.
          </p>
        </section>

        <section>
          <h2 className="md3-headline-small text-secondary mb-4">
            💡 서비스 특장점
          </h2>
          <ul className="list-disc pl-5 md3-body-large text-on-surface-variant space-y-2">
            <li>실시간 AI 음성 대화를 통한 실질적인 언어 학습</li>
            <li>
              다양한 외국어 지원 (영어, 한국어, 일본어, 중국어, 스페인어 등)
            </li>
            <li>언제 어디서나 사용 가능한 모바일 친화적 인터페이스</li>
            <li>효과적인 학습 진행 상황 및 포인트 관리 시스템 제공</li>
            <li>편리한 포인트 충전 및 구독 결제 시스템</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
