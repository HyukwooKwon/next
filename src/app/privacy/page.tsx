import Head from "next/head";
import Link from "next/link";

export default function Privacy() {
  return (
    <>
      <Head>
        <title>개인정보처리방침 - LinguaAI</title>
        <meta name="description" content="LinguaAI 개인정보처리방침" />
      </Head>

      <div className="min-h-screen bg-gray-50 py-8 md3-motion-standard">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Material Design Card 적용 */}
          <div className="md3-card p-8">
            <div className="mb-8">
              <h1 className="md3-headline-large font-bold text-md3-on-surface mb-2">
                개인정보처리방침
              </h1>
              <p className="md3-body-medium text-md3-on-surface-variant">
                최종 업데이트: 2025년 7월 24일
              </p>
            </div>

            <div className="space-y-8">
              {privacyContent.map((section, index) => (
                <section key={index}>
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
              <Link href="/terms" className="md3-chip">
                이용약관
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

// 개인정보처리방침 내용을 배열로 정리하여 관리성 강화
const privacyContent = [
  {
    title: "1. 개인정보의 처리목적",
    content: [
      "회사는 외국어 학습 콘텐츠 제공, 회원 관리, 마케팅 및 광고를 목적으로 개인정보를 처리합니다. 처리 목적 변경 시 별도의 동의를 받습니다.",
    ],
  },
  {
    title: "2. 개인정보의 처리 및 보유기간",
    content: [
      "회사는 관련 법령에 따라 개인정보 처리 및 보유 기간을 준수합니다. 회원가입 및 관리, 서비스 제공, 불만 처리 등의 기간을 명확히 규정합니다.",
    ],
  },
  // 추가 항목은 동일한 형식으로 배열 구성
];
