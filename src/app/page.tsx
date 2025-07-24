"use client";
import { useAudioStore } from "@/store/audioStore";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [language, setLanguage] = useState("");
  const jwtToken = useAudioStore((state) => state.jwtToken);
  const points = useAudioStore((state) => state.points);
  const subscriptionActive = useAudioStore((state) => state.subscriptionActive);

  const handleLogin = () => router.push("/login");
  const handleRegister = () => router.push("/register");
  const handleCharge = () => router.push("/charge");

  const startStudy = () => {
    if (!jwtToken) {
      alert("로그인이 필요합니다.");
      router.push("/login");
      return;
    }
    if (!language) {
      alert("언어를 선택해주세요.");
      return;
    }
    router.push(`/study?lang=${language}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="md3-card" style={{ borderRadius: "0" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="md3-headline-small font-semibold text-primary">
              LinguaAI
            </h1>
            <nav className="flex space-x-6">
              <a
                href="/about"
                className="md3-label-large text-on-surface-variant hover:text-primary"
              >
                서비스 소개
              </a>
              <a
                href="/features"
                className="md3-label-large text-on-surface-variant hover:text-primary"
              >
                주요 기능
              </a>
              <a
                href="/pricing"
                className="md3-label-large text-on-surface-variant hover:text-primary"
              >
                요금제
              </a>
              <a
                href="/start"
                className="md3-label-large text-on-surface-variant hover:text-primary"
              >
                학습 시작
              </a>
              <a
                href="/terms"
                className="md3-label-large text-on-surface-variant hover:text-primary"
              >
                이용약관
              </a>
              <a
                href="/privacy"
                className="md3-label-large text-on-surface-variant hover:text-primary"
              >
                개인정보처리방침
              </a>
              <a
                href="/refund"
                className="md3-label-large text-on-surface-variant hover:text-primary"
              >
                환불정책
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="md3-display-medium text-on-surface mb-6">
            AI와 함께하는 <span className="text-primary">실시간 음성 학습</span>
          </h1>
          <p className="md3-body-large text-on-surface-variant mb-12">
            인공지능 튜터와 자연스러운 대화를 통해 외국어를 빠르고 효과적으로
            학습하세요
          </p>
          <div className="flex justify-center space-x-4">
            {!jwtToken ? (
              <>
                <button className="md3-button-filled" onClick={handleLogin}>
                  로그인
                </button>
                <button
                  className="md3-button-outlined"
                  onClick={handleRegister}
                >
                  회원가입
                </button>
              </>
            ) : (
              <div className="md3-card md3-card-elevated p-6">
                <div className="flex items-center justify-center space-x-4 mb-4">
                  <span className="md3-body-large">
                    💰 현재 포인트: <strong>{points}P</strong>
                  </span>
                  <button className="md3-button-tonal" onClick={handleCharge}>
                    포인트 충전
                  </button>
                </div>
                <div className="text-center">
                  <div
                    className={`md3-chip ${
                      subscriptionActive
                        ? "bg-tertiary-container text-on-tertiary-container"
                        : "bg-error-container text-on-error-container"
                    }`}
                  >
                    {subscriptionActive
                      ? "✅ 현재 구독 중입니다"
                      : "❌ 구독 중이 아닙니다"}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Service Section */}
      <section id="service" className="py-16 bg-surface">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="md3-headline-large text-on-surface mb-4">
            서비스 소개
          </h2>
          <p className="md3-body-large text-on-surface-variant">
            LinguaAI는 AI 기반 실시간 음성 대화를 통한 혁신적인 외국어 학습
            플랫폼입니다
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-surface-variant">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="md3-headline-large text-on-surface mb-4">주요 기능</h2>
          <p className="md3-body-large text-on-surface-variant">
            LinguaAI가 제공하는 핵심 학습 기능들을 확인해보세요
          </p>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 bg-surface">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="md3-headline-large text-on-surface mb-4">요금제</h2>
          <p className="md3-body-large text-on-surface-variant">
            자신에게 맞는 학습 플랜을 선택하세요
          </p>
        </div>
      </section>

      {/* Start Study Section */}
      <section
        id="start"
        className="py-16 bg-gradient-to-r from-primary to-secondary text-on-primary"
      >
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="md3-headline-large mb-6">
            지금 바로 AI와 함께 학습을 시작하세요!
          </h2>
          <div className="md3-card md3-card-elevated p-8 bg-white bg-opacity-10 backdrop-blur-sm">
            <select
              className="w-full max-w-md mx-auto px-4 py-3 border-2 rounded-lg md3-body-medium"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="">언어 선택</option>
              <option value="company1071">🇺🇸 영어 (초중급)</option>
              <option value="company1051">🇺🇸 영어 (중고급)</option>
              <option value="company1072">🇰🇷 한국어 (초중급)</option>
              <option value="company1052">🇰🇷 한국어 (중고급)</option>
              <option value="company1074">🇯🇵 일본어 (초중급)</option>
              <option value="company1054">🇯🇵 일본어 (중고급)</option>
              <option value="company1073">🇨🇳 중국어 (초중급)</option>
              <option value="company1053">🇨🇳 중국어 (중고급)</option>
              <option value="company1075">🇪🇸 스페인어 (초중급)</option>
              <option value="company1055">🇪🇸 스페인어 (중고급)</option>
            </select>
            <div className="mt-6 flex flex-col md:flex-row gap-4 justify-center">
              <button
                className="md3-fab bg-green-500 hover:bg-green-600"
                onClick={() => {
                  if (!jwtToken) {
                    alert("로그인이 필요합니다.");
                    router.push("/login");
                    return;
                  }
                  if (!language) {
                    alert("언어를 선택해주세요.");
                    return;
                  }
                  router.push(`/study/basic?lang=${language}`);
                }}
              >
                🎙️ 초중급 (음성 입력 후 전달)
              </button>
              <button
                className="md3-fab bg-blue-500 hover:bg-blue-600"
                onClick={() => {
                  if (!jwtToken) {
                    alert("로그인이 필요합니다.");
                    router.push("/login");
                    return;
                  }
                  if (!language) {
                    alert("언어를 선택해주세요.");
                    return;
                  }
                  router.push(`/study?lang=${language}`);
                }}
              >
                🚀 중고급 (실시간 음성대화)
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-inverse-surface text-inverse-on-surface">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="md3-body-medium">
            &copy; 2025 LinguaAI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
