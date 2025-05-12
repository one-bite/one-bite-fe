"use client";

import React from "react";
import { Card, CardBody } from "@nextui-org/react";
import AnswerOptions from "app/_components/options/AnswerOptions";


interface QuizCardProps {
  leftStreak?: number;  // 남은 문제 수
  subject?: string;     // 문제 토픽 CS-100
  title: string;
  question: string;    // 문제 내용
  options: string[];   // 객관식 선택지
  selected: string | null;  // 선택된 답
  onSelect: (selected: string) => void;  // 선택지 선택 함수
  isCorrect: boolean | null; // 정답 여부 CS-114
  correctAnswer: string; // 정답 CS-114
  className?: string;
}

const QuizCard: React.FC<QuizCardProps> = ({
  leftStreak,
  //subject, //CS-114에선 사용하지 않았어서 주석처리
  title,
  question,
  options,
  selected,
  className,
  onSelect,
  isCorrect,
  correctAnswer,
}) => {
  return (
    <Card className={`w-full max-w-3xl p-4 ${className}`}>
      <CardBody>
        {typeof leftStreak === "number" && (
            <div className="bg-lime-400 rounded-lg px-4 py-1 mb-4 w-64 h-[26px] text-white">
              <p>
                <b>{leftStreak}</b>문제만 더 풀면 스트릭을 쌓아요
              </p>
            </div>)}

        <p className="text-xs text-gray-400 mb-1">
          한입코딩 {">"} 코스 {">"} {title}
        </p>
        <h1 className="text-2xl font-linebold my-2">{title}</h1>
        <h2 className="text-lg font-semibold mb-4">{question}</h2>

        <AnswerOptions
        options={options}
        onSelect={onSelect}
        selected={selected}
        isCorrect={isCorrect}
        correctAnswer={correctAnswer} // 정답
        />
      </CardBody>
    </Card>
  );
};

export default QuizCard;
