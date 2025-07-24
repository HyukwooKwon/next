"use client";

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 py-16 px-4">
      <div className="max-w-4xl mx-auto md3-card p-10">
        <h1 className="md3-display-medium text-primary text-center mb-8">
          LinguaAI 주요 기능
        </h1>

        <section className="mb-8">
          <h2 className="md3-headline-small text-secondary mb-4">
            🎙️ 실시간 AI 음성 대화
          </h2>
          <p className="md3-body-large text-on-surface-variant">
            AI와 실시간 음성 대화를 통해 실제 원어민과 대화하는 것과 같은
            환경에서 언어 학습이 가능합니다.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="md3-headline-small text-secondary mb-4">
            🌍 다양한 외국어 학습 지원
          </h2>
          <p className="md3-body-large text-on-surface-variant">
            영어, 한국어, 일본어, 중국어, 스페인어 등 다양한 언어를 AI 튜터와
            함께 학습할 수 있습니다.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="md3-headline-small text-secondary mb-4">
            📱 모바일 최적화 인터페이스
          </h2>
          <p className="md3-body-large text-on-surface-variant">
            모바일 기기에서도 완벽히 작동하는 반응형 웹을 통해 언제 어디서나
            학습이 가능합니다.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="md3-headline-small text-secondary mb-4">
            📈 학습 진행 관리 및 포인트 시스템
          </h2>
          <p className="md3-body-large text-on-surface-variant">
            학습 진행 상황을 손쉽게 관리하고, 포인트 충전을 통해 효율적으로 학습
            시간을 늘릴 수 있습니다.
          </p>
        </section>

        <section>
          <h2 className="md3-headline-small text-secondary mb-4">
            💳 간편한 결제 시스템
          </h2>
          <p className="md3-body-large text-on-surface-variant">
            포인트 충전 및 월정액 구독을 통해 원하는 방식으로 서비스를 이용할 수
            있습니다.
          </p>
        </section>
      </div>
    </div>
  );
}
