"use client";

import React from "react";
import { Card, CardBody } from "@nextui-org/react";
import MyButton from "app/_components/MyButton";
import AnswerOptions from "app/_components/quiz/AnswerOptions";

interface QuizCardProps {
    leftStreak: number;
    subject: string;
    question: string;
    options: string[];
    onSelect: (selected: string) => void;
    selected: string | null;
}

const handleAskAI = () => {
    console.log("AI에게 질문!");
};

const handleSubmit = () => {
    /*if (!selected) {
        alert("먼저 답변을 선택해주세요.");
        return;
    }
    console.log("정답 제출:", selected);*/
    // TODO: 정답 검증 로직 추가
};

const QuizCard: React.FC<QuizCardProps> = ({
                                               leftStreak,
                                               subject,
                                               question,
                                               options,
                                               onSelect,
                                               selected,
                                           }) => {
    return (
        <Card className="w-full max-w-xl p-4 min-w-[800px]">
            <CardBody className="">
                <div className="bg-lime-400 rounded-lg px-4 py-1 mb-4 w-64 h-[26px] text-white">
                    <p><b>{leftStreak}문제</b>만 더 풀면 스트릭을 쌓아요</p>
                </div>
                <p className="text-xs text-gray-400 mb-1">한입코딩 {">"} 코스 {">"} {subject}</p>
                <h2 className="text-lg font-semibold mb-4">{question}</h2>
                <AnswerOptions options={options} onSelect={onSelect} selected={selected} />
                <div className="flex justify-start"></div>
                <div className="flex justify-end mt-8 gap-4">
                    <MyButton className="bg-gradient-to-r from-indigo-600 to-purple-500
                     shadow-purple-900 hover:bg-purple-600 active:shadow-purple-900" onClick={handleAskAI}>
                        AI에 질문하기
                    </MyButton>
                    <MyButton onClick={handleSubmit}>정답 제출 →</MyButton>
                </div>
            </CardBody>
        </Card>
    );
};

export default QuizCard;
