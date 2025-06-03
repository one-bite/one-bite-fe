"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ResultCard from "@/app/_components/card/ResultCard";

function Results() {

  const searchParams = useSearchParams();

  const score = Number(searchParams.get("score") || 0);
  const correctAnswers = Number(searchParams.get("correct") || 0);

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-4xl p-6">
        <ResultCard
          correctAnswers={correctAnswers}
          wrongAnswers={0} // 챌린지에는 불필요
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