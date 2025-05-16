"use client";

import React from "react";
import { Input } from "@nextui-org/react";

interface AnswerOptionsProps {
    onSelect: (selected: string) => void;
    selected: string | null;
    isCorrect: boolean | null;
    correctAnswer: string;
}

const AnswerMultipleOptions: React.FC<AnswerOptionsProps> = ({ selected, onSelect, isCorrect, correctAnswer }) => {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onSelect(e.target.value); // 선택이 입력을 의미
    };

    return (
        <div className="flex flex-col space-y-4">
            <Input
                label="정답을 입력하세요"
                value={selected ?? ""}
                onChange={handleChange}
                disabled={isCorrect !== null}
                className={"w-full h-full rounded-lg bg-gray-100 font-line text-black"}
            />
            {isCorrect === false && (
                <p className={"text-red-500 font-line"}>정답 : {correctAnswer}</p>
            )}
        </div>
    );
};

export default AnswerMultipleOptions;
