"use client";

import React from "react";
import { Button } from "@nextui-org/react";

interface AnswerOptionsProps {
    options: string[];
    onSelect: (selected: string) => void;
}

const AnswerOptions: React.FC<AnswerOptionsProps> = ({ options, onSelect }) => {
    return (
        <div className="flex flex-col space-y-3">
            {options.map((option, index) => (
                <Button
                    key={index}
                    fullWidth
                    variant="bordered"
                    onPress={() => onSelect(option)}
                    className="justify-start"
                >
                    {option}
                </Button>
            ))}
        </div>
    );
};

export default AnswerOptions;
