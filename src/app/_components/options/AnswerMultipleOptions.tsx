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

const AnswerMultipleOptions: React.FC<AnswerOptionsProps> = ({ options, onSelect, selected, isCorrect, correctAnswer }) => {
    return (
        <div className="flex flex-col space-y-3">
            {options.map((option, index) => {
                const isSelected = selected === (index+1).toString();
                const isAnwer = correctAnswer === (index+1).toString();

                let color: "default" | "primary" | "success" | "danger" = "default";

                if (isCorrect === true && isSelected) {
                    color = "primary"; // 정답 선택
                }
                if (isCorrect === null && isSelected) {
                    color = "primary";
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
                    key={index+1}
                    fullWidth
                    variant="bordered"
                    color={color}
                    onPress={() => onSelect((index+1).toString())}
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

export default AnswerMultipleOptions;
