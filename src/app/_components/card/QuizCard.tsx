"use client";

import React from "react";
import { Card, CardBody } from "@nextui-org/react";
import AnswerMultipleOptions from "app/_components/options/AnswerMultipleOptions";
import AnswerTFOptions from "app/_components/options/AnswerTFOptions";
import AnswerShortInput from "app/_components/sub_components/AnswerShortInput";
import GeneratedByAiIcon from "app/_components/icon/GeneratedByAiIcon";
import {HeartIcon} from "lucide-react";

interface QuizCardProps {
    leftStreak?: number; // 남은 문제 수는 오늘의 문제에서만 사용
    topic?: string; // 문제 토픽은 로그에서만 사용
    questionType: "multiple_choice" | "short_answer" | "true_false";
    title: string;
    question: string; // 문제 내용
    options: string[]; // 객관식 선택지
    selected: string | null;
    onSelect: (selected: string) => void;
    isCorrect: boolean | null;
    correctAnswer: string;
    className?: string;
    generatedByAI?: boolean;
    lives?: number; // 목숨 수는 챌린지에서만
}

const QuizCard: React.FC<QuizCardProps> = ({
    leftStreak,
    topic,
    questionType,
    title,
    question,
    options,
    selected,
    onSelect,
    isCorrect,
    correctAnswer,
    className,
    generatedByAI,
    lives
}) => {

    return (
        <Card className={`w-full max-w-3xl p-4 ${className}`}>
            <CardBody>
                <div className={"flex justify-between items-center"}>
                    {typeof lives === "number" ? (
                        <>
                            <div className="bg-purple-500 rounded-lg px-4 py-1 mb-4 w-52 h-[26px] text-white font-line">
                                <p>최고의 점수를 획득하세요!</p>
                            </div>
                            <div className="absolute top-4 right-4 flex gap-1">
                                {[...Array(3)].map((_, i) => {
                                    const isFilled = i >= 3 - lives;
                                    return (
                                        <span key={i} className="text-red-500 text-xl">
                                            <HeartIcon className={`size-6 ${isFilled ? "fill-red-500" : "fill-none stroke-red-500"}`} />
                                        </span>
                                    );
                                })}
                            </div>
                        </>
                    ) : (
                        <div />
                    )}

                    {typeof leftStreak === "number" ? (
                        <div className="bg-lime-400 rounded-lg px-4 py-1 mb-4 w-64 h-[26px] text-white font-line">
                            <p>
                                <b>{leftStreak}</b>문제만 더 풀면 스트릭을 쌓아요
                            </p>
                        </div>
                    ) : (
                        <div />
                    )}
                    {generatedByAI && <GeneratedByAiIcon />}
                </div>

                {topic && (
                    <p className="text-xs text-gray-400 mb-1">
                        한입코딩 {">"} {topic}
                    </p>
                )}

                {lives && <p className="text-xs text-gray-400 mb-1">한입코딩 {">"} 역량평가</p>}

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
                    <AnswerTFOptions options={options} onSelect={onSelect} selected={selected} isCorrect={isCorrect} correctAnswer={correctAnswer} />
                )}
                {questionType === "short_answer" && (
                    <AnswerShortInput onSelect={onSelect} selected={selected} isCorrect={isCorrect} correctAnswer={correctAnswer} />
                )}
            </CardBody>
        </Card>
    );
};

export default QuizCard;
