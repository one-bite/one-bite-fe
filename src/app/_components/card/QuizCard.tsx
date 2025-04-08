"use client";

import React from "react";
import { Card, CardBody } from "@nextui-org/react";
import MyButton from "app/_components/MyButton";

interface QuizCardProps {
    leftStreak: number;
    courseTitle: string;
    question: string;
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
                                               courseTitle,
                                               question,
                                           }) => {
    return (
        <Card className="w-full max-w-xl p-4 min-w-[800px]">
            <CardBody className="">
                <div className="bg-lime-400 rounded-lg px-4 py-1 mb-4 w-64 h-[26px] text-white">
                    <p><b>{leftStreak}문제</b>만 더 풀면 스트릭을 쌓아요</p>
                </div>
                <p className="text-xs text-gray-400 mb-1">한입코딩 &amp;gt 코스 &amp;gt {courseTitle}</p>
                <h2 className="text-lg font-semibold mb-4">{question}</h2>
                <div className="flex justify-center mt-8 gap-4">
                    <MyButton className="bg-purple-500 hover:bg-purple-600" onClick={handleAskAI}>
                        AI에게 물어보기
                    </MyButton>
                    <MyButton onClick={handleSubmit}>정답 제출 →</MyButton>
                </div>
            </CardBody>
        </Card>
    );
};

export default QuizCard;
