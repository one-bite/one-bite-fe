"use client";

import React from "react";
import { useRouter } from "next/navigation";
import MyButton from "app/_components/buttons/MyButton";

interface ResultCardProps {
  correctAnswers: number;
  wrongAnswers: number;
  score: number;
  todayStreakQuizLeft: number;
}


const ResultItem: React.FC<{ label: string; value: string | number; color: string; isScore?: boolean }> = ({ label, value, color, isScore }) => {
  return (
    <div className="flex justify-center items-center text-3xl mb-6 px-8 text-center">
      <span className="font-extrabold text-2xl mr-4">{label}</span>
      <span className={`font-extrabold ${isScore ? "text-6xl" : "text-5xl"} ${color} ml-[80px]`}>{value}</span>
    </div>
  );
};

const ResultCard: React.FC<ResultCardProps> = ({ correctAnswers, wrongAnswers, score, todayStreakQuizLeft }) => {

  const router = useRouter();

  const handleGoHome = () => {
    router.replace("/");
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-2xl border-2 border-gray-200 w-full max-w-4xl text-center">
      <h1 className="text-6xl font-extrabold text-lime-600 mb-6 mt-4">채점 결과</h1>
        {todayStreakQuizLeft > 0 ? (
            <p className="text-3xl font-extrabold text-gray-700 mb-8">스트릭 달성까지 <span className="text-red-500">{todayStreakQuizLeft}</span>문제 남았어요!</p>
        ) : (
            <p className="text-3xl font-extrabold text-gray-700 mb-8"> 오늘의 <span className="text-red-500">스트릭</span>을 달성했어요!</p>
        )}


      <div className="space-y-6 mb-6">
        <ResultItem label="맞힌 문제 수:" value={correctAnswers} color="text-blue-500" />
        <ResultItem label="틀린 문제 수:" value={wrongAnswers} color="text-red-500" />
        <ResultItem label="총 레이팅 포인트:" value={`+${score}`} color="text-orange-600" isScore={true} />
      </div>

      <MyButton onClick={handleGoHome} className="w-1/2 h-14 py-3">
        메인 화면으로 돌아가기
      </MyButton>
    </div>
  );
};

export default ResultCard;
