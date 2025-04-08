"use client";

import { useState } from "react";
import React from "react";
import MyButton from "app/_components/MyButton";
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
                    courseTitle="Python 기초"
                    question="다음 중 Python에서 리스트(List)를 생성하는 방법으로 올바른 것은?"
                    options={["<section>", "<article>", "<div>", "<header>"]}
                    onSelect={handleAnswer}
                    selected={selected}
                />
            </div>


        </div>
    );
};

export default Quiz;

