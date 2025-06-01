"use client";

import { useRouter } from "next/navigation";
import DailyStreakCard from "app/_components/card/DailyStreakCard";
import {getRank, getStreak, syncUserStreak, UserRankData} from "@/utils/user";
import React, { useState, useEffect } from "react";
import ProgressCard from "app/_components/card/ProgressCard";
import { fetchTotalProblemNumber } from "@/utils/apis/problemStats";
import RecentActivityCard from "@/app/_components/card/RecentActivityCard";
import EnterChallengeCard from "app/_components/card/EnterChallengeCard";
import BadgeCard from "app/_components/card/BadgeCard";
import {fetchProblemHistory} from "@/utils/apis/problemHistory";
import {fetchTodayProblems} from "@/utils/apis/todayProblem";

export default function Page() {
    const router = useRouter();
    const [isReady, setIsReady] = useState(false);
    const [todayStreakLeft, setTodayStreakLeft] = useState(0);
    const [weeklyStreakHistory, setWeeklyStreakHistory] = useState<string[]>([]);
    const [problemStats, setProblemStats] = useState<{ total: number; solved: number }>({ total: 1, solved: 0 });
    const [userRank,setUserRank] = useState<UserRankData>({score:0,rank:"Iron"});
    const [correctStats, setCorrectStats] = useState({correct:0, todayCorrect:0});

    useEffect(() => {
        if (!sessionStorage.getItem("alreadyBooted")) {
            sessionStorage.setItem("alreadyBooted", "true");
            localStorage.clear(); // 무조건 초기화
            router.push("/login");
            return;
        }

        const token = localStorage.getItem("accessToken");
        const email = localStorage.getItem("user_email");

        if (!token || !email) {
            router.replace("/login");
            return;
        }

        const syncStreak = async () => {
            await syncUserStreak();
            const mystreak = getStreak();
            setTodayStreakLeft(mystreak.todayStreakQuizLeft);
            setWeeklyStreakHistory(mystreak.streakHistory);
        };

        const loadStats = async () => {
            const data = await fetchTotalProblemNumber();
            const history = await fetchProblemHistory();

            const totalData = data.total;
            const solvedData = data.solved

            const totalCorrect = history.filter((h)=>h.isCorrect).length;

            const todayProblems = await fetchTodayProblems();
            const todayProblemsIds = todayProblems?.problemList.map((p) => p.problemId) || [];

            const correctTodayStreak = history.filter((h)=>todayProblemsIds.includes(h.problem.problemId) && h.isCorrect).length;

            setProblemStats({ total: totalData, solved: solvedData });
            setCorrectStats({correct: totalCorrect, todayCorrect: correctTodayStreak});
        };

        Promise.all([syncStreak(), loadStats()]).then(() => {
            const rankData = getRank();
            setUserRank(rankData);

            setIsReady(true);
        });
    }, [router]);

    if (!isReady) return null;

    return (
        <>
            <div className="max-w-4xl mx-auto w-full px-4 md:px-0">
                <div className="flex justify-center w-full">
                    <DailyStreakCard streakleftquiz={todayStreakLeft} streakHistory={weeklyStreakHistory} />
                </div>
                <div className="grid md:grid-cols-2 gap-6 mt-8">
                    <EnterChallengeCard rank={userRank.rank} score={userRank.score} />
                    <ProgressCard total={problemStats.total} solved={problemStats.solved} correct={correctStats.correct} todayCorrect={correctStats.todayCorrect} todayTotal={10 - todayStreakLeft}/>
                </div>
                <div className="grid md:grid-cols-2 gap-6 mt-8">
                    <RecentActivityCard />
                    <BadgeCard/>
                </div>
            </div>
        </>
    );
}
