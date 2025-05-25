"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ResultCard from "@/app/_components/card/ResultCard";
import {getStreak} from "@/utils/user";

function Results() {

  const searchParams = useSearchParams();

  const streakQuizLeft = getStreak().todayStreakQuizLeft;
  //query string 읽어옴
  const correctAnswers = Number(searchParams.get("correct") || 0);
  const wrongAnswers = Number(searchParams.get("wrong") || 0);

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-4xl p-6">
        {/* 결과 카드 컴포넌트 사용 */}
        <ResultCard
          correctAnswers={correctAnswers}
          wrongAnswers={wrongAnswers}
          score={null} //스트릭일 땐 score를 null로 줘야 함
          todayStreakQuizLeft={streakQuizLeft}
        />
      </div>
    </main>
  );
}

export default function ResultsPage() {
  return (
    <Suspense fallback={<div>결과 불러오는 중...</div>}>
      <Results />
    </Suspense>
  );
}