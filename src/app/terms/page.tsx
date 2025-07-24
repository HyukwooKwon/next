import Head from "next/head";
import Link from "next/link";

export default function Terms() {
  return (
    <>
      <Head>
        <title>이용약관 - LinguaAI</title>
        <meta
          name="description"
          content="LinguaAI 외국어 학습 서비스 이용약관"
        />
      </Head>

      <div className="min-h-screen bg-gray-50 py-8 md3-motion-standard">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Material Design Card 적용 */}
          <div className="md3-card p-8">
            <div className="mb-8">
              <h1 className="md3-headline-large font-bold text-md3-on-surface mb-2">
                이용약관
              </h1>
              <p className="md3-body-medium text-md3-on-surface-variant">
                최종 업데이트: 2025년 7월 24일
              </p>
            </div>

            <div className="space-y-8">
              {termsContent.map((section, index) => (
                <section key={index}>
                  {/* Material Design Title 적용 */}
                  <h2 className="md3-title-large font-semibold text-md3-on-primary-container bg-md3-primary-container rounded px-3 py-1 inline-block mb-4">
                    {section.title}
                  </h2>
                  <div className="md3-body-large text-md3-on-surface space-y-3">
                    {section.content.map((content, idx) => (
                      <p key={idx}>{content}</p>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            {/* Material Design Chip 형태로 링크 변경 */}
            <div className="mt-12 pt-8 border-t border-md3-outline-variant flex space-x-4">
              <Link href="/privacy" className="md3-chip">
                개인정보처리방침
              </Link>
              <Link href="/refund" className="md3-chip">
                환불정책
              </Link>
              <Link href="/" className="md3-chip">
                홈으로
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// 이용약관의 내용을 배열로 정리하여 관리성 강화
const termsContent = [
  {
    title: "제1조 (목적)",
    content: [
      '본 약관은 주식회사 LinguaAI(이하 "회사")가 제공하는 외국어 학습 및 AI 실시간 대화 서비스(이하 "서비스")의 이용조건 및 절차, 회사와 이용자의 권리, 의무, 책임사항과 기타 필요한 사항을 규정함을 목적으로 합니다.',
    ],
  },
  {
    title: "제2조 (정의)",
    content: [
      '"서비스"란 회사가 제공하는 외국어 학습 플랫폼 및 AI 실시간 대화 서비스를 의미합니다.',
      '"이용자"란 본 약관에 따라 서비스를 받는 회원 및 비회원을 말합니다.',
      '"회원"이란 회사에 개인정보를 제공하여 회원등록을 한 자를 말합니다.',
      '"AI 튜터"란 인공지능 기술을 활용하여 외국어 학습을 지원하는 가상 교사 시스템을 의미합니다.',
    ],
  },
  // 추가 조항들은 위 형식을 따라 배열로 구성
];
