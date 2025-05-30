"use client";

import React from "react";
import { useRouter } from "next/navigation";
import MyButton from "app/_components/buttons/MyButton";

interface ResultCardProps {
    correctAnswers: number;
    wrongAnswers: number;
    score: number | null; // 스트릭 결과라면 null
    todayStreakQuizLeft: number | null; // 챌린지 결과라면 null
    isChallenge: boolean;
}

const ResultItem: React.FC<{ label: string; value: string | number; color: string; isScore?: boolean }> = ({ label, value, color, isScore }) => {
    return (
        <div className="flex justify-center items-center text-3xl mb-6 px-8 text-center">
            <span className="font-extrabold text-2xl mr-4">{label}</span>
            <span className={`font-extrabold ${isScore ? "text-6xl" : "text-5xl"} ${color} ml-[80px]`}>{value}</span>
        </div>
    );
};

const ResultCard: React.FC<ResultCardProps> = ({ correctAnswers, wrongAnswers, score, todayStreakQuizLeft, isChallenge }) => {
    const router = useRouter();

    const handleGoLog = () => {
        router.push("/log");
    };

    const handleGoHome = () => {
        router.push("/");
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-2xl border-2 border-gray-200 w-full max-w-4xl text-center">
            {todayStreakQuizLeft != null && ( //스트릭 결과라면 해당 값을 프롭으로 전달. 이 값이 존재하면 해당 문구 표시
                <h1 className="text-6xl font-extrabold text-lime-600 mb-6 mt-4">
                    오늘의 <span className="text-red-500">스트릭</span>을 달성했어요!
                </h1>
            )}
            {isChallenge && (
                <>
                    <h1 className="text-6xl font-extrabold text-lime-600 mb-6 mt-4">
                        <span className="text-red-500">역량평가</span>가 완료되었습니다!
                    </h1>
                    <p className="text-3xl font-extrabold text-gray-700 mb-8">채점 결과</p>
                </>
            )}

            <div className="space-y-6 mb-6">
                <ResultItem label="맞힌 문제 수:" value={correctAnswers} color="text-blue-500" />
                {!isChallenge && <ResultItem label="틀린 문제 수:" value={wrongAnswers} color="text-red-500" />}
                {isChallenge && (
                    <>
                        <ResultItem label="획득한 점수:" value={`+${score}`} color="text-orange-600" isScore={true} />
                        {/*}<ResultItem label="등급:" value={`+${rank}`} color="text-orange-600" isScore={true} /> {*/}
                        <ResultItem label="총 레이팅 포인트:" value={`+${score}`} color="text-orange-600" isScore={true} />
                    </>
                )}
            </div>

            <MyButton onClick={handleGoLog} className="w-1/2 h-14 py-3">
                풀이 기록 확인하기
            </MyButton>

            <MyButton onClick={handleGoHome} className="w-1/2 h-14 py-3">
                메인 화면으로 돌아가기
            </MyButton>
        </div>
    );
};

export default ResultCard;
