"use client";

import DailyStreakCard from "app/_components/card/DailyStreakCard";
import ResumeCourseButton from "app/_components/buttons/ResumeCourseButton";

export default function Page() {
    return (
        <>
            <div>
                <DailyStreakCard className="m-16" streakleftquiz={10}/>
            </div>
            <div>
                <ResumeCourseButton courseName={"Python"}/>
            </div>
        </>
    );
}
