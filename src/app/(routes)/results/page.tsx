"use client";

import { useSearchParams } from "next/navigation";
import ResultCard from "@/app/_components/card/ResultCard";
import {getStreak} from "@/utils/user";

export default function ResultsPage() {

  const streakQuizLeft = getStreak().todayStreakQuizLeft;
  const searchParams = useSearchParams();

  //query string 읽어옴
  const score = Number(searchParams.get("score") || 0);
  const reward = Number(searchParams.get("reward") || 0);
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
          point={reward}
          todayStreakQuizLeft={streakQuizLeft}
        />
      </div>
    </main>
  );
};