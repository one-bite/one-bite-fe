"use client";

import React from "react";
import { Button } from "@nextui-org/react";

interface AnswerOptionsProps {
    options: string[];
    onSelect: (selected: string) => void;
    selected: string | null;
}

const AnswerOptions: React.FC<AnswerOptionsProps> = ({ options, onSelect, selected }) => {
    return (
        <div className="flex flex-col space-y-3">
            {options.map((option, index) => (
                <Button
                    key={index}
                    fullWidth
                    variant={selected === option ? "bordered" : "bordered"}
                    color={selected === option ? "primary" : "default"}
                    onPress={() => onSelect(option)}
                    className="justify-start bg-gray-100"
                >
                    <div className="py-1 w-8 h-8 rounded-[6px] -ml-2 text-xl bg-white">{index+1}</div>
                    {option}
                </Button>
            ))}
        </div>
    );
};

export default AnswerOptions;
