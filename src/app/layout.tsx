import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI 음성 학습 서비스",
  description: "AI 음성 기반 언어 학습 서비스",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <main className="flex-grow">{children}</main>

        {/* 🚩 사업자 정보 하단 footer */}
        <footer className="bg-gray-200 text-sm p-4 text-center border-t mt-auto">
          <div className="max-w-5xl mx-auto">
            <p>
              <strong>상호명:</strong> 세인클러스터
            </p>
            <p>
              <strong>사업자등록번호:</strong> 457-34-00690
            </p>
            <p>
              <strong>대표자명:</strong> 권혁우
            </p>
            <p>
              <strong>주소:</strong> 경기도 수원시 장안구 연무로 20번길 4, 2층
            </p>
            <p>
              <strong>전화번호:</strong> 010-2264-6275
            </p>
            <p>
              <strong>통신판매업 신고번호:</strong> 제2020-수원영통-0435호
            </p>
            <p>Copyright © 2025 세인클러스터. All Rights Reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
