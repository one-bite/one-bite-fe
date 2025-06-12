"use client"

import { Button } from "@nextui-org/react";

interface AIGenerateButtonProps {
    onClick: () => void;
    className?: string;
}

const AIGenerateButton = ({ onClick, className = "" }: AIGenerateButtonProps) => {
    return (
        <Button
            onClick={onClick}
            className={`flex justify-center items-center gap-2 my-2 md:my-8 mx-4
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
            유사 문제 풀어보기 (AI)
        </Button>
    );
};

export default AIGenerateButton;