"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Card, CardBody } from "@nextui-org/react";
import MyButton from "app/_components/MyButton";
import AnswerOptions from "app/_components/quiz/AnswerOptions";
import ResultModal from "../quiz/ResultModal";

interface QuizCardProps {
    leftStreak: number;
    subject: string;
    question: string;
    options: string[];
    correctAnswer: string;  //정답이 props로 들어온다 가정
    onSelect: (selected: string) => void;
    selected: string | null;
}

const QuizCard: React.FC<QuizCardProps> = ({ leftStreak, subject, question, options, correctAnswer, onSelect, selected }) => {

    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [score, setScore] = useState(0);
    const [showModal, setShowModal] = useState(false);

    const router = useRouter();

    const handleAskAI = () => {
        console.log("AI에게 질문!");
    };
    
    const handleSubmit = () => {
        if (!selected) {
            alert("정답을 선택해야함");
            return;
        }
        const correct = selected === correctAnswer;
        setIsCorrect(correct);
        setScore(correct ? 28 : 2); // 점수는 임의값
        setShowModal(true);
    };
    
    const handleNext = () => {
        console.log("다음 문제로 이동");
        router.push("/results"); 
    };

    return (
        <Card className="w-full max-w-xl p-4 min-w-[800px]">
            <CardBody>
                <div className="bg-lime-400 rounded-lg px-4 py-1 mb-4 w-64 h-[26px] text-white">
                    <p>
                        <b>{leftStreak}문제</b>만 더 풀면 스트릭을 쌓아요
                    </p>
                </div>
                <p className="text-xs text-gray-400 mb-1">한입코딩 {">"} 코스 {">"} {subject}</p>
                <h2 className="text-lg font-semibold mb-4">{question}</h2>
                <AnswerOptions options={options} onSelect={onSelect} selected={selected} />
                <div className="flex justify-start"></div>
                <div className="flex justify-end mt-8 gap-4">
                    <MyButton
                        className="bg-gradient-to-r from-indigo-600 to-purple-500
                     shadow-purple-900 hover:bg-purple-600 active:shadow-purple-900"
                        onClick={handleAskAI}
                    >
                        AI에 질문하기
                    </MyButton>
                    <MyButton onClick={handleSubmit}>정답 제출 →</MyButton>
                </div>
            </CardBody>
            <ResultModal isOpen={showModal} isCorrect={isCorrect ?? true} score={score} 
            remaining={8} gold={10}  //남은 문제 수, 획득한 골드 수는 임의값
            onNext={handleNext}
            />
        </Card>
    );
};

export default QuizCard;
