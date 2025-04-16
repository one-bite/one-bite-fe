"use client";

import React from "react";
import ResultCard from "@/app/_components/card/ResultCard";  // ResultCard 컴포넌트 임포트

const ResultsPage = () => {
  // 하드코딩된 값들
  const correctAnswers = 9;
  const wrongAnswers = 1;
  const ratingPoints = 254;
  const gold = 90;

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-4xl p-6">
        {/* 결과 카드 컴포넌트 사용 */}
        <ResultCard 
          correctAnswers={correctAnswers}
          wrongAnswers={wrongAnswers}
          ratingPoints={ratingPoints}
          gold={gold}
        />
      </div>
    </main>
  );
};

export default ResultsPage;
