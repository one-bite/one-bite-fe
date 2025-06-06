"use client";

import React from "react";
import {Button} from "@nextui-org/react";

interface Props {
    onClick?: () => void;
    className?: string;
}

const ProblemExplanationButton = ({ onClick, className = "" }: Props) => {
    return (
        <Button
            onClick={onClick}
            className={`flex justify-center items-center gap-2 my-8 mx-4
                        w-[240px] h-16 text-white text-lg font-linebold
                        bg-gradient-to-r from-indigo-500 to-purple-500
                        rounded-2xl
                        shadow-[0_3px_0_rgba(79,70,229,1)]  /* indigo-600 */
                        hover:from-indigo-400 hover:to-purple-400
                        active:translate-y-[3px]
                        active:shadow-[0_-3px_0_rgba(79,70,229,1)]
                        transition-all duration-150 ease-in-out
                        ${className}`}
        >
            개념 확인하기 (AI)
        </Button>
    );
};

export default ProblemExplanationButton;
