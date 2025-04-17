"use client";

import React from "react";
import BigCard from "app/_components/base_components/BigCard"
import StreakIcon from "app/_components/icon/StreakIcon";
import StartQuizButton from "app/_components/buttons/StartQuizButton";
import WeeklyStreakCalendar from "app/_components/WeeklyStreakCalendar";

interface DailyStreakCardProps {
    streakleftquiz: number;
}

const DailyStreakCard = ({ streakleftquiz = 8 }: DailyStreakCardProps) => {
    return(
        <BigCard className="m-8 w-[880px] h-[220px] border border-lime-400">
            <div className="flex justify-between">
                <div className="flex justify-center items-center p-8 w-1/2
                                bg-[radial-gradient(ellipse_at_bottom,_rgba(251,146,60,0.3),_transparent_70%)]">
                    <StreakIcon className="m-4 size-32 text-red-500"/>
                    <div>
                        <p className="text-lg font-linebold">오늘 스트릭 달성까지</p>
                        <h1 className="text-3xl font-linebold whitespace-nowrap">
                            <span className="text-4xl text-red-500 font-linebold">{streakleftquiz}문제 </span>
                            남았어요!
                        </h1>
                    </div>
                </div>
                <div className="flex flex-col justify-center items-center p-8 pl-0 w-1/2 gap-4">
                    <div className="w-full text-sm text-center font-line">이번주 나의 스트릭</div>
                    <WeeklyStreakCalendar
                        streakDates={[
                            new Date("2025-04-14"), // 월
                            new Date("2025-04-15"), // 화
                        ]}
                    />
                    <StartQuizButton className="self-center" subject="Python"/>
                </div>
            </div>
        </BigCard>
    );
}

export default DailyStreakCard;