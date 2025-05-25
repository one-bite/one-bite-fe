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

    const textColor = isCorrect === true
            ? "text-success"
            : isCorrect === false
                ? "text-danger"
                : "text-black";

    return (
        <div className="flex flex-col mt-32 mx-16 mb-8">
            <Input
                placeholder={"정답을 입력하세요"}
                value={selected ?? ""}
                onChange={handleChange}
                disabled={isCorrect !== null}
                className={"w-full placeholder:text-gray-500"}
                classNames={{
                    inputWrapper: `rounded-lg bg-gray-200 h-16 px-4`,
                    input: `font-line text-lg ${textColor}`
                }}
            />
            {isCorrect === false && (
                <p className={"mt-4 justify-start text-lg text-success font-line"}>정답 : {correctAnswer}</p>
            )}
        </div>
    );
};

export default AnswerMultipleOptions;
