"use client";

import DailyStreakCard from "app/_components/card/DailyStreakCard";
import CourseButton from "./_components/buttons/CourseButton";
import ResumeCourseButton from "app/_components/buttons/ResumeCourseButton";
import BigCard from "app/_components/base_components/BigCard";
import {getStreak} from "@/utils/user";

export default function Page() {
    const mystreak = getStreak();
    const todayStreakLeft = mystreak.todayStreakQuizLeft;
    const weeklyStreakHistory: Date[] = mystreak.streakHistory.map(dateStr => new Date(dateStr));

    return (

        <>
            <div>
                <DailyStreakCard streakleftquiz={todayStreakLeft} streakDates={weeklyStreakHistory} />
                <div className="flex gap-2 justify-start mt-2 max-w-4xl mx-auto">
                    <CourseButton iconType="algorithm" label="알고리즘" bgColor="bg-purple-200" />
                    <CourseButton iconType="javascript" label="자바스크립트" bgColor="bg-yellow-200" />
                    <CourseButton iconType="python" label="파이썬 기초" bgColor="bg-blue-200" />
                </div>
            </div>
            <div className="flex">
                <ResumeCourseButton courseName={"Python"}/>
                <BigCard className="flex m-4 w-[560px] h-[232px] bg-white">
                    <h2>(내용 고민 중)</h2>
                </BigCard>
            </div>
        </>
    );
}
