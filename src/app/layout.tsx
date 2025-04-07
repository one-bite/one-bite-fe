import type { Metadata } from "next";
import { Providers } from "./providers";
import "./globals.css";
import Header from "./_components/header/Header";
import env from "./_configs/env"

export const metadata: Metadata = {
    title: "한입코딩",
    description: "매일매일 배우는 맞춤형 코딩 학습 웹사이트, 한입코딩",
    icons: {
        icon: "/favicon.ico",
    },
    openGraph: {
        title: "한입코딩",
        description: "매일매일 배우는 맞춤형 코딩 학습 웹사이트, 한입코딩",
        url: env.frontendUrl || "http://1bite-coding.duckdns.org",
        images: [
            {
                url: `${env.frontendUrl}/og-image.png`,
                alt: "OG-IMAGE",
            },
        ],
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="ko">
            <body className="min-h-screen flex-col justify-center">
                <Header />
                <div className="flex justify-center">
                    <div className="max-w-[1024px] w-full">
                        <Providers>{children}</Providers>
                    </div>
                </div>
            </body>
        </html>
    );
}
