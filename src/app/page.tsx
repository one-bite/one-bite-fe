"use client";

import DailyStreakCard from "app/_components/card/DailyStreakCard";
import CourseButton from "./_components/buttons/CourseButton";
import ResumeCourseButton from "app/_components/buttons/ResumeCourseButton";
import BigCard from "app/_components/base_components/BigCard";
import { getStreak } from "@/utils/user";
import {Logo} from "app/_components/icon/LogoIcon";
import React from "react";
//import { useEffect } from "react";

export default function Page() {

    const mystreak = getStreak();
    const todayStreakLeft = mystreak.todayStreakQuizLeft;
    const weeklyStreakHistory = mystreak.streakHistory;

    return (

        <>
            <div>
                <DailyStreakCard streakleftquiz={todayStreakLeft} streakHistory={weeklyStreakHistory} />
                <div className="flex gap-2 justify-start mt-2 max-w-4xl mx-auto">
                    <CourseButton iconType="python" label="파이썬 기초" bgColor="bg-blue-200" />
                </div>
            </div>
            <div className="flex mx-auto">
                <ResumeCourseButton courseName={"Python"}/>
                <BigCard className="flex m-4 w-[560px] h-[232px] bg-white">
                    <div
                        className={"flex bg-gradient-to-r from-indigo-700 to-purple-700 w-20 h-9 rounded-lg px-1 mb-4 text-white text-xl font-line"}>
                        <Logo/><span className={"py-1.5 -mx-1"}>AI</span>
                    </div>
                </BigCard>
            </div>
        </>
    );
}
