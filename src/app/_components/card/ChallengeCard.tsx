"use client";

import React from "react";
import { Card, CardBody } from "@nextui-org/react";
import AnswerMultipleOptions from "app/_components/options/AnswerMultipleOptions";
import AnswerTFOptions from "app/_components/options/AnswerTFOptions";
import AnswerShortInput from "app/_components/sub_components/AnswerShortInput";
import {HeartIcon} from "lucide-react";


interface QuizCardProps {
  leftStreak?: number;  // 남은 문제 수
  topic?: string;     // 문제 토픽 CS-100
  title: string;
  question: string;    // 문제 내용
  options: string[];   // 객관식 선택지
  selected: string | null;  // 선택된 답
  onSelect: (selected: string) => void;  // 선택지 선택 함수
  isCorrect: boolean | null;
  correctAnswer: string;
  className?: string;
  generatedByAI?:boolean;
  questionType: "multiple_choice" | "short_answer" | "true_false";
  lives: number;
}

const QuizCard: React.FC<QuizCardProps> = ({
  title,
  question,
  options,
  selected,
  className,
  onSelect,
  isCorrect,
  correctAnswer,
  questionType,
  lives,
}) => {
  return (
    <Card className={`w-full max-w-3xl p-4 ${className}`}>
      <CardBody>
        <div className={"flex justify-between items-center"}>
          <div className="bg-purple-500 rounded-lg px-4 py-1 mb-4 w-52 h-[26px] text-white font-line">
            <p>
              최고의 점수를 획득하세요!
            </p>
          </div>
          <div className="absolute top-4 right-4 flex gap-1">
            {[...Array(3)].map((_, i) => {
              const isFilled = i>= (3 - lives);
              return(
                <span key={i} className="text-red-500 text-xl">
                  <HeartIcon className={`size-6 ${isFilled ? "fill-red-500" : "fill-none stroke-red-500"}`}/>
                </span>
            );
            })}
          </div>
        </div>

        <p className="text-xs text-gray-400 mb-1">
          한입코딩 {">"} 역량평가
        </p>
        <h1 className="text-2xl font-linebold my-2">{title}</h1>
        <h2 className="text-lg font-semibold mb-4">{question}</h2>

        {questionType === "multiple_choice" && (
            <AnswerMultipleOptions
                options={options}
                onSelect={onSelect}
                selected={selected}
                isCorrect={isCorrect}
                correctAnswer={correctAnswer} // 정답
            />
        )}
        {questionType === "true_false" && (
            <AnswerTFOptions
                options={options}
                onSelect={onSelect}
                selected={selected}
                isCorrect={isCorrect}
                correctAnswer={correctAnswer}
            />
        )}
        {questionType === "short_answer" && (
            <AnswerShortInput
                onSelect={onSelect}
                selected={selected}
                isCorrect={isCorrect}
                correctAnswer={correctAnswer}
            />
        )}
      </CardBody>
    </Card>
  );
};

export default QuizCard;
