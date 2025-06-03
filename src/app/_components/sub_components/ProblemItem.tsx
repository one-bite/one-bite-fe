"use client"

import React from "react";

interface ProblemItemProps {
    id: number | string;
    title: string;
    choose?: () => void;
    isCorrect?: boolean
}

const ProblemItem = ({ id, title, choose, isCorrect }: ProblemItemProps) => {
    const titleColor = isCorrect == null ? "text-black" : isCorrect ? "text-green-700" : "text-red-700";

    return (
        <div className={`flex px-1 py-1 hover:bg-gray-300 active:bg-gray-400 selection:bg-gray-400 md:hover:bg-gray-300 md:active:bg-gray-400 md:selection:bg-gray-400 rounded-lg cursor-pointer`} onClick={choose}>
            <span className="font-line text-medium text-gray-500 mr-2 shrink-0">{id}. </span>
            <span className={`w-full text-medium font-line truncate ${titleColor}`}>{title}</span>
        </div>
    );
};

export default ProblemItem;
