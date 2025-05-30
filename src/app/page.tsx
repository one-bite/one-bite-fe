"use client";

import { useRouter } from "next/navigation";
import DailyStreakCard from "app/_components/card/DailyStreakCard";
import CourseButton from "./_components/buttons/CourseButton";
import ResumeCourseButton from "app/_components/buttons/ResumeCourseButton";
import {getStreak, syncUserStreak} from "@/utils/user";
import React, { useState, useEffect} from "react";
import ProgressCard from "app/_components/card/ProgressCard";
import {fetchTotalProblemNumber} from "@/utils/apis/problemStats";

export default function Page() {
    const router = useRouter();
    const [isReady, setIsReady] = useState(false);
    const [todayStreakLeft, setTodayStreakLeft] = useState(0);
    const [weeklyStreakHistory, setWeeklyStreakHistory] = useState<string[]>([]);
    const [problemStats, setProblemStats] = useState<{total:number, solved:number}>({total:1,solved:0});

    useEffect(() => {
        if (!sessionStorage.getItem("alreadyBooted")) {
            localStorage.clear(); // 무조건 초기화
            sessionStorage.setItem("alreadyBooted", "true");
            router.push("/login");
            return;
        }

        const token = localStorage.getItem("accessToken");
        const email = localStorage.getItem("user_email");

        if(!token || !email) {
            router.replace("/login");
            return;
        }

        const syncStreak = async () => {
            await syncUserStreak();
            const mystreak = getStreak();
            setTodayStreakLeft(mystreak.todayStreakQuizLeft);
            setWeeklyStreakHistory(mystreak.streakHistory);
        }

        const loadStats = async () => {
            const data = await fetchTotalProblemNumber();
            setProblemStats({ total: data.total, solved: data.solved });
        };

        Promise.all([syncStreak(),loadStats()]).then(()=>{
            setIsReady(true);
        })

    }, [router]);


    function handleClearLocalStorage() {
        localStorage.clear();
        alert("로컬 스토리지가 초기화되었습니다.");
    }

    if (!isReady) return null;

    return (

        <>
            <div className={"flex justify-center"}>
                <DailyStreakCard streakleftquiz={todayStreakLeft} streakHistory={weeklyStreakHistory}/>
            </div>
            <div className="flex gap-2 justify-start mt-2 max-w-4xl mx-auto">
                <CourseButton iconType="python" label="로컬초기화" bgColor="bg-blue-200" onClick={handleClearLocalStorage}/>  {/*로컬스토리지 초기화*/}
            </div>
            <div className="flex justify-center mx-auto">
                <ResumeCourseButton courseName={"Python"}/>
                <ProgressCard total={problemStats.total} solved={problemStats.solved} />
            </div>
        </>
    );
}
