"use client";

import React from "react";
import { Button, ButtonProps } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { getStreak } from "@/utils/user";

interface StartQuizButtonProps extends ButtonProps {
    subject?: string;
}

const StartQuizButton = ({subject = "Python", className = "", ...props }: StartQuizButtonProps) => {

    const router = useRouter();
    const todaystreak = getStreak();

    const handleClick = () => {
        if (todaystreak.todayStreakQuizLeft === -1) {
            alert("오늘의 퀴즈는 모두 풀었습니다.");
            return;
        }
        router.push(`/quiz?subject=${subject}`)
    }

    return (
        <Button
            onClick={handleClick}
            className={`
            flex items-center justify-center gap-2
            w-64 h-12
            text-white text-base font-line font-bold
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
            <span>바로 {subject} 문제 풀기</span>
            <ArrowRight className="w-5 h-5 stroke-[2.5]"/>
        </Button>
    );
};

export default StartQuizButton;
