"use client";

import React from "react";
import BigCard from "app/_components/base_components/BigCard";
import StreakIcon from "app/_components/icon/StreakIcon";
import StartQuizButton from "app/_components/buttons/StartQuizButton";
import WeeklyStreakCalendar from "app/_components/WeeklyStreakCalendar";

interface DailyStreakCardProps {
    streakleftquiz: number;
    streakHistory: string[];
}

const DailyStreakCard = ({ streakleftquiz, streakHistory }: DailyStreakCardProps) => {
    return (
        <BigCard className="w-full max-w-full md:max-w-[880px] h-auto m-2 md:m-8">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center w-full">
                <div className="relative flex flex-col items-center justify-center w-full md:w-1/2 p-4 md:p-8 overflow-hidden">
                    <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(251,146,60,0.3),_transparent_70%)]" />
                    <div className="relative z-10 flex flex-col items-center">
                        <StreakIcon className="m-2 size-20 md:size-32 text-red-500" />
                        <p className="text-base md:text-lg font-linebold">오늘 스트릭 달성까지</p>
                        <h1 className="text-xl md:text-3xl font-linebold whitespace-nowrap">
                            <span className="text-2xl md:text-4xl text-red-500 font-linebold">{streakleftquiz}문제 </span>
                            남았어요!
                        </h1>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center w-full md:w-1/2 p-4 md:p-8 gap-2 md:gap-4">
                    <div className="w-full text-xs md:text-sm text-center font-line">이번주 나의 스트릭</div>
                    <WeeklyStreakCalendar streakDates={streakHistory} />
                    <StartQuizButton className="self-center w-full h-10 text-base md:w-64 md:h-12 md:text-lg" subject="Python" />
                </div>
            </div>
        </BigCard>
    );
};

export default DailyStreakCard;
