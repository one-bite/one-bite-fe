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
        <div className="flex flex-row justify-center space-x-14">
            {options.map((option, index) => {
                const isSelected = selected === (index).toString();
                const isAnwer = correctAnswer === (index).toString();

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
                    onPress={() => onSelect((index + 1).toString())}
                    className="my-10 ml-0 flex items-center justify-center bg-gray-100 w-[300px] h-[200px]"
                    isDisabled={isCorrect !== null} // 정답 제출 후 비활성화
                >
                    <span className="text-9xl leading-none mt-6 font-linebold">{option}</span>
                </Button>
                );
            })}
        </div>
    );
};

export default AnswerMultipleOptions;
