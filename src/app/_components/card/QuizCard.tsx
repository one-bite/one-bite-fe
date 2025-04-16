"use client";

import React from "react";
import { Card, CardBody } from "@nextui-org/react";
import AnswerOptions from "app/_components/options/AnswerOptions";


interface QuizCardProps {
  leftStreak: number;  // 남은 문제 수
  subject: string;     // 문제 제목
  question: string;    // 문제 내용
  options: string[];   // 객관식 선택지
  selected: string | null;  // 선택된 답
  onSelect: (selected: string) => void;  // 선택지 선택 함수
}

const QuizCard: React.FC<QuizCardProps> = ({
  leftStreak,
  subject,
  question,
  options,
  selected,
  onSelect
}) => {
  return (
    <Card className="w-full max-w-xl p-4 min-w-[800px]">
      <CardBody>
        <div className="bg-lime-400 rounded-lg px-4 py-1 mb-4 w-64 h-[26px] text-white">
          <p>
            <b>{leftStreak}</b>문제만 더 풀면 스트릭을 쌓아요
          </p>
        </div>

        <p className="text-xs text-gray-400 mb-1">
          한입코딩 {">"} 코스 {">"} {subject}
        </p>
        <h2 className="text-lg font-semibold mb-4">{question}</h2>

        <AnswerOptions options={options} onSelect={onSelect} selected={selected} />
      </CardBody>
    </Card>
  );
};

export default QuizCard;
