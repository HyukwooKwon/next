import Head from "next/head";
import Link from "next/link";

export default function Refund() {
  return (
    <>
      <Head>
        <title>환불정책 - LinguaAI</title>
        <meta name="description" content="LinguaAI 환불정책 및 취소 안내" />
      </Head>

      <div className="min-h-screen bg-gray-50 py-8 md3-motion-standard">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Material Design Card 적용 */}
          <div className="md3-card p-8">
            <div className="mb-8">
              <h1 className="md3-headline-large font-bold text-md3-on-surface mb-2">
                환불정책
              </h1>
              <p className="md3-body-medium text-md3-on-surface-variant">
                최종 업데이트: 2025년 7월 31일
              </p>
            </div>

            <div className="space-y-8">
              {refundContent.map((section, index) => (
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
              <Link href="/privacy" className="md3-chip">
                개인정보처리방침
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

// 예시 데이터 추가
const refundContent = [
  {
    title: "1. 환불정책 개요",
    content: [
      '주식회사 LinguaAI(이하 "회사")는 전자상거래 등에서의 소비자보호에 관한 법률, 약관의 규제에 관한 법률, 소비자기본법 등 관련 법령에 따라 소비자의 청약철회 및 환불권을 보장하고 있습니다.',
      "디지털 콘텐츠의 특성상 구매 확정 후에는 환불이 제한될 수 있으나, 정당한 사유가 있는 경우 관련 법령에 따라 환불을 진행합니다.",
    ],
  },
  {
    title: "2. 환불 가능 조건",
    content: [
      "결제 후 7일 이내이며, 서비스를 이용하지 않은 경우 등 회사의 귀책사유가 인정되는 경우 환불이 가능합니다.",
      "서비스를 이미 이용한 경우, 결제일로부터 7일이 경과한 경우 등은 환불이 불가능합니다.",
    ],
  },
];
