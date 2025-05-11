"use client";

import React from "react";
import { Button } from "@nextui-org/react";

interface AnswerOptionsProps {
    options: string[];
    onSelect: (selected: string) => void;
    selected: string | null;
    isCorrect: boolean | null;
    correctAnswer: string;
}

const AnswerOptions: React.FC<AnswerOptionsProps> = ({ options, onSelect, selected, isCorrect, correctAnswer }) => {
    return (
        <div className="flex flex-col space-y-3">
            {options.map((option, index) => {
                const isSelected = selected === option;
                const isAnwer = correctAnswer === option;

                let color: "default" | "primary" | "success" | "danger" = "default";

                if (isCorrect === true && isSelected) {
                    color = "primary"; // 정답 선택
                }

                if (isCorrect === false) {
                    if (isSelected && !isAnwer) {
                        color = "danger"; // 오답 선택
                    } else if (isAnwer) {
                        color = "success"; // 정답
                    }
                }
                return(
                <Button
                    key={index}
                    fullWidth
                    variant="bordered"
                    color={color}
                    onPress={() => onSelect(option)}
                    className="justify-start bg-gray-100"
                    isDisabled={isCorrect !== null} // 정답 제출 후 비활성화
                >
                    <div className="py-1 w-8 h-8 rounded-[6px] -ml-2 text-xl bg-white" color={selected === option ? "primary" : "white"}>{index+1}</div>
                    {option}
                </Button>
                );
            })}
        </div>
    );
};

export default AnswerOptions;
