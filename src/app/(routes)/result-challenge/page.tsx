"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import ResultCard from "@/app/_components/card/ResultCard";
//import { Logo } from "@/app/_components/icon/LogoIcon";
import { syncUserRank, getRank, getRankColor } from "@/utils/user";

function Results() {

  const searchParams = useSearchParams();

  const score = Number(searchParams.get("score") || 0);
  const correctAnswers = Number(searchParams.get("correct") || 0);

  const [rank, setRank] = useState<string>("");
  const [textColor, setTextColor] = useState<string>("");
  const [badgeColor, setBadgeColor] = useState<string>("");

  useEffect(() => {
    const loadRank = async () => {
      await syncUserRank();
      const myRank = getRank().name;
      setRank(myRank);
      setTextColor(getRankColor(myRank).textColor);
      setBadgeColor(getRankColor(myRank).badgeColor);
    }

    loadRank();
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-4xl md:p-6 -p-2">
        <ResultCard
          correctAnswers={correctAnswers}
          wrongAnswers={0} // 챌린지에는 불필요
          score={score}
          todayStreakQuizLeft={null} // 챌린지이므로 null
          isChallenge={true} // 챌린지이므로 true
          rank={rank}
          textColor={textColor}
          badgeColor={badgeColor}
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