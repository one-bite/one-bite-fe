"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ResultCard from "@/app/_components/card/ResultCard";

function Results() {

  const searchParams = useSearchParams();

  //query string 읽어옴
  const score = Number(searchParams.get("score") || 0);
  const correctAnswers = Number(searchParams.get("correct") || 0);
  const wrongAnswers = Number(searchParams.get("wrong") || 0);

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-4xl p-6">
        {/* 결과 카드 컴포넌트 사용 */}
        <ResultCard
          correctAnswers={correctAnswers}
          wrongAnswers={wrongAnswers}
          score={score}
          todayStreakQuizLeft={null} // 챌린지이므로 null
          isChallenge={true} // 챌린지이므로 true
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