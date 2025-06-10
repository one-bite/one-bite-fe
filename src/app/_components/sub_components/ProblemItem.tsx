"use client"

import React from "react";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/solid";

interface ProblemItemProps {
    id: number | string;
    title: string;
    choose?: () => void;
    isCorrect?: boolean
}

const ProblemItem = ({ id, title, choose, isCorrect }: ProblemItemProps) => {
    const titleColor = isCorrect == null ? "text-black" : isCorrect ? "text-gray-900" : "text-red-700";

    return (
        <div className={`flex px-1 py-1 hover:bg-gray-300 active:bg-gray-200 selection:bg-gray-200 md:hover:bg-gray-300 md:active:bg-gray-200 md:selection:bg-gray-200 rounded-lg cursor-pointer`} onClick={choose}>
            <span className="font-line text-medium text-gray-500 mr-2 shrink-0">{id}. </span>
            <span className={`w-full px-2 text-medium font-linebold text-gray-text-opacity-80 truncate ${titleColor}`}>{title}</span>
            <span>
                {isCorrect === true && <CheckIcon className={"w-5 h-5 text-green-500"}/>}
                {isCorrect === false && <XMarkIcon className={'w-5 h-5 text-red-500'}/>}
            </span>
        </div>
    );
};

export default ProblemItem;
