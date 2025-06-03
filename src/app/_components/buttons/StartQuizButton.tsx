"use client";

import React from "react";
import { Button, ButtonProps } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { getStreak } from "@/utils/user";

interface StartQuizButtonProps extends ButtonProps {
    subject?: string;
}

const StartQuizButton = ({className = "", ...props }: StartQuizButtonProps) => {

    const router = useRouter();
    const todaystreak = getStreak();

    const handleClick = () => {
        if (todaystreak.todayStreakQuizLeft === 0) {
            router.push('/log');
            return;
        }
        router.push(`/quiz`);
    }

    const buttonText =  todaystreak.todayStreakQuizLeft == 0 ? "문제 풀이 내역 보기" : todaystreak.todayStreakQuizLeft < 10 ? "오늘의 문제 이어서 풀기" : "오늘의 문제 풀러 가기";

    return (
        <Button
            onClick={handleClick}
            className={`
            flex items-center justify-center gap-2
            w-64 h-12
            text-white text-base font-line font-linebold
            bg-lime-500
            rounded-2xl
            shadow-[0_3px_0_#65A30D] /* lime-600 */
            hover:bg-lime-400
            active:translate-y-[3px]
            active:shadow-[0_-3px_0_#65A30D]
            transition-all duration-150 ease-in-out
            ${className}
            `}
            {...props}
        >
            <span>{buttonText}</span>
            <ArrowRight className="w-5 h-5 stroke-[2.5]"/>
        </Button>
    );
};

export default StartQuizButton;
