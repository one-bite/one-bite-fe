"use client";

import React from "react";
import StreakIcon from "app/_components/icon/StreakIcon";
import StartQuizButton from "app/_components/buttons/StartQuizButton";
import WeeklyStreakCalendar from "app/_components/WeeklyStreakCalendar";
import MainSectionCard from "app/_components/card/MainSectionCard";

interface DailyStreakCardProps {
    streakleftquiz: number;
    streakHistory: string[];
}

const DailyStreakCard = ({ streakleftquiz, streakHistory }: DailyStreakCardProps) => {
    return (
        <MainSectionCard className="w-full max-w-full md:max-w-[880px] m-2 md:m-8 p-0">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start w-full px-3 py-3 md:py-8 md:px-10">
                <div className="flex flex-col justify-start w-full md:w-1/2 gap-2 md:p-0 md:gap-3 overflow-hidden">
                    <div className="flex items-center gap-2 mb-1">
                        <div className={"bg-orange-500 rounded-full p-1"}>
                            <StreakIcon className="text-white size-7 md:size-9 p-1"/>
                        </div>
                        <span className={"text-lg font-linebold text-orange-500 md:text-2xl"}>데일리 스트릭</span>
                    </div>
                    <div className="flex flex-col gap-2 md:px-8 p-0 items-center md:items-start text-center md:text-left md:mt-4 mt-2">
                        <h1 className="text-xl md:text-3xl font-linebold">
                            오늘 스트릭 달성까지<br/>
                            <span
                                className="text-2xl md:text-4xl text-orange-500 font-linebold">{streakleftquiz}문제 </span>남았어요!
                        </h1>
                        <p className="text-sm md:text-sm text-gray-600 font-line mt-1">오늘의 문제를 풀고 연속 스트릭을 유지하세요</p>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center w-full md:w-1/2 p-4 md:p-8 gap-2 md:gap-4">
                    <div className="w-full text-xs md:text-lg text-center font-linebold">이번주 나의 스트릭</div>
                    <WeeklyStreakCalendar streakDates={streakHistory}/>
                    <StartQuizButton className="self-center w-full h-10 text-base md:w-64 md:h-12 md:text-lg mt-1"/>
                </div>
            </div>
        </MainSectionCard>
    );
};

export default DailyStreakCard;
