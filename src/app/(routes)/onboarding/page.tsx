"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@nextui-org/react";
import { Logo } from "@/app/_components/icon/LogoIcon";
import FeatureBlock from "@/app/_components/onboarding/FeatureBlock";
import StreakIcon from "@/app/_components/icon/StreakIcon";
import GeneratedByAiIcon from "@/app/_components/icon/GeneratedByAiIcon";
import PointIcon from "@/app/_components/icon/PointIcon";
import HowToBlock from "@/app/_components/onboarding/HowToBlock";

const OnboardingPage = () => {
    return (
        <div className="min-h-screen flex flex-col items-center bg-gray-50">
            {/* 서비스 한 줄 소개 + 대표 이미지/일러스트 */}
            <section className="w-full max-w-2xl flex flex-col items-center text-center mt-16 mb-12">
                <h1 className="text-4xl font-extrabold mb-4">코딩학습은 한입코딩에서 시작됩니다</h1>
                <p className="text-lg text-gray-600 mb-6">매일 10문제, AI 해설, 풀이 기록까지! 한입에 끝내는 코딩 학습</p>
                <div className="w-64 h-40 bg-gray-200 rounded-xl flex items-center justify-center mb-4">
                    {/* 대표 이미지/일러스트 */}
                    <span className="text-gray-400">이미지/일러스트 자리</span>
                </div>
            </section>

            {/* 주요 기능 */}
            <section className="w-full max-w-2xl flex flex-col gap-8 mb-16">
                <FeatureBlock
                    icon={<StreakIcon className="w-10 h-10 text-red-400" />}
                    title="매일 10문제"
                    description="매일 새로운 문제로 꾸준히 실력 향상"
                />
                <FeatureBlock icon={<GeneratedByAiIcon />} title="AI 해설" description="모르는 문제는 AI가 친절하게 설명" />
                <FeatureBlock
                    icon={<PointIcon className="w-10 h-10 text-lime-600" />}
                    title="풀이 기록"
                    description="내가 푼 문제와 성장 기록을 한눈에"
                />
            </section>

            {/* 사용 방법 */}
            <section className="w-full max-w-2xl mb-20">
                <h2 className="text-2xl font-bold mb-8 text-center">사용 방법</h2>
                <div className="flex flex-col md:flex-row justify-center items-center gap-8">
                    <HowToBlock step={1} title="1단계 제목" description="1단계 설명." />
                    <HowToBlock step={2} title="2단계 제목" description="2단계 설명." />
                    <HowToBlock step={3} title="3단계 제목" description="3단계 설명." />
                </div>
            </section>

            {/* 로그인 버튼 */}
            <footer className="w-full flex flex-col items-center mb-8">
                <Link href="/login">
                    <Button color="primary" className="w-64 h-14 text-lg font-bold rounded-xl shadow-lg">
                        Google로 시작하기
                    </Button>
                </Link>
                <div className="flex justify-center mt-4 text-gray-400 text-xs gap-2">
                    <Link href="/privacy" className="hover:underline">
                        개인정보처리방침
                    </Link>
                    <span>·</span>
                    <Link href="/terms" className="hover:underline">
                        이용약관
                    </Link>
                </div>
            </footer>
        </div>
    );
};

export default OnboardingPage;
