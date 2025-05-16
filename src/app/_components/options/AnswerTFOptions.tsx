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
        <div className="flex flex-row space-x-28">
            {options.map((option, index) => {
                const isSelected = selected === option;
                const isAnwer = correctAnswer === option;

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
                    key={index}
                    variant="bordered"
                    color={color}
                    onPress={() => onSelect(option)}
                    className="justify-start bg-gray-100 w-[300px] h-[200px]"
                    isDisabled={isCorrect !== null} // 정답 제출 후 비활성화
                >
                    {option}
                </Button>
                );
            })}
        </div>
    );
};

export default AnswerMultipleOptions;
