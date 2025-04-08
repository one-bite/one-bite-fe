"use client";

import { useState } from "react";
import React from "react";
import QuestionCard from "app/_components/card/QuizCard";

const Quiz = () => {
    const [selected, setSelected] = useState<string | null>(null);

    const handleAnswer = (answer: string) => {
        console.log("선택됨:", answer);
        setSelected(answer);
    };

    return (
        <div className="m-12 min-h-screen p-4">
            <div className="flex justify-center">
                <QuestionCard
                    leftStreak={9}
                    subject="Python 기초"
                    question="다음 중 Python에서 리스트(List)를 생성하는 방법으로 올바른 것은?"
                    options={["list = (1, 2, 3)", "print = (1, 2, 3)", "select = (1, 2, 3)", "option = (1, 2, 3)"]}
                    correctAnswer="list = (1, 2, 3)"
                    onSelect={handleAnswer}
                    selected={selected}
                />
            </div>


        </div>
    );
};

export default Quiz;

