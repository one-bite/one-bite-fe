"use client";

import DailyStreakCard from "app/_components/card/DailyStreakCard";
import CourseButton from "./_components/buttons/CourseButton";
import ResumeCourseButton from "app/_components/buttons/ResumeCourseButton";
import BigCard from "app/_components/base_components/BigCard";

export default function Page() {
    return (
        <>
            <div>
                <DailyStreakCard className="m-8" streakleftquiz={10} />
                <div className="flex gap-2 justify-start mt-2 max-w-4xl mx-auto">
                    <CourseButton iconType="algorithm" label="알고리즘" bgColor="bg-purple-200" />
                    <CourseButton iconType="javascript" label="자바스크립트" bgColor="bg-yellow-200" />
                    <CourseButton iconType="python" label="파이썬 기초" bgColor="bg-blue-200" />
                </div>
            </div>
            <div className="flex">
                <ResumeCourseButton courseName={"Python"}/>
                <BigCard className="flex m-4 w-[560px] h-[232px] bg-white">
                    <h2>여기에 코스 진척도 % 표시 (미정)</h2>
                </BigCard>
            </div>
        </>
    );
}
