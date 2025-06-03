import type { Metadata } from "next";
import { Providers } from "./providers";
import "./globals.css";
import Header from "./_components/header/Header";
import Footer from "./_components/Footer";
import * as process from "process";
import ActivityTracker from "app/system/ActivityTracker";

export const metadata: Metadata = {
    title: "한입코딩",
    description: "매일매일 배우는 맞춤형 코딩 학습 웹사이트, 한입코딩",
    icons: {
        icon: "/favicon.ico",
    },
    openGraph: {
        title: "한입코딩",
        description: "매일매일 배우는 맞춤형 코딩 학습 웹사이트, 한입코딩",
        url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}` || "http://one-bite-fe.site",
        images: [
            {
                url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/og-image.png`,
                alt: "OG-IMAGE",
            },
        ],
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="ko">
            <body className="min-h-screen flex-col justify-center bg-gray-50">
            <Header/>
            <div className="flex justify-center">
                <div className="max-w-screen-lg w-screen">
                    <ActivityTracker />
                    <Providers>{children}</Providers>
                </div>
            </div>
            <div className={"flex justify-center items-center overflow-x-hidden"}>
                <Footer />
            </div>
            </body>
        </html>
    );
}
