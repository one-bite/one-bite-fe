"use client";

import { useRouter } from "next/navigation";
import DailyStreakCard from "app/_components/card/DailyStreakCard";
import {getRank, getStreak, syncUserStreak, syncUserRank} from "@/utils/user";
import React, { useState, useEffect } from "react";
import ProgressCard from "app/_components/card/ProgressCard";
import { fetchTotalProblemNumber } from "@/utils/apis/problemStats";
import EnterChallengeCard from "app/_components/card/EnterChallengeCard";
import BadgeCard from "app/_components/card/BadgeCard";
import {fetchProblemHistory} from "@/utils/apis/problemHistory";
import {fetchTodayLog} from "@/utils/apis/todayProblem";

export default function Page() {
    const router = useRouter();
    const [isReady, setIsReady] = useState(false);
    const [todayStreakLeft, setTodayStreakLeft] = useState(0);
    const [weeklyStreakHistory, setWeeklyStreakHistory] = useState<string[]>([]);
    const [problemStats, setProblemStats] = useState<{ total: number; solved: number }>({ total: 1, solved: 0 });
    const [rank, setRank] = useState<string>("Unranked");
    const [score, setScore] = useState<number>(0);
    const [correctStats, setCorrectStats] = useState({correct:0, todayCorrect:0});
    const [totalToday, setTotalToday] = useState(10);

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        const email = localStorage.getItem("user_email");

        if (!token || !email) {
            router.replace("/onboarding");
            return;
        }

        const syncStreak = async () => {
            await syncUserStreak();
            const mystreak = getStreak();
            setTodayStreakLeft(mystreak.todayStreakQuizLeft);
            setWeeklyStreakHistory(mystreak.streakHistory);
        };

        const syncRank = async () => {
            await syncUserRank();
            const myrank = getRank();
            setRank(myrank.name);
            setScore(myrank.point);
        };

        const loadStats = async () => {
            const data = await fetchTotalProblemNumber();
            const history = await fetchProblemHistory();

            const totalData = data.total;
            const solvedData = data.solved

            const totalCorrect = history.filter((h)=>h.isCorrect).length;

            const todayProblems = await fetchTodayLog();
            const todayProblemsIds = todayProblems?.problemList.map((p) => p.problemId) || [];

            const totalTodayProblem = todayProblems?.problemList.map((p) => p.problemId).length || 10;

            const correctTodayStreak = history.filter((h)=>todayProblemsIds.includes(h.problem.problemId) && h.isCorrect).length;

            setProblemStats({ total: totalData, solved: solvedData });
            setCorrectStats({correct: totalCorrect, todayCorrect: correctTodayStreak});
            setTotalToday(totalTodayProblem);
        };

        Promise.all([syncStreak(), loadStats(), syncRank()]).then(() => {
            const rankData = getRank();
            setRank(rankData.name);
            setScore(rankData.point);
            setIsReady(true);
        });

    }, [router]);

    if (!isReady) return null;

//그냥 안쓰는게 좋겠다 이거 수정할때까지 무효
/*    useEffect(() => {
        const timeout = setTimeout(() => {
            if (!isReady) {
                window.location.reload();
            }
        }, 10000); // 또는 2000ms

        return () => clearTimeout(timeout);
    }, [isReady]);
*/
    return (
        <>
            <div className="max-w-4xl mx-auto w-full px-4 md:px-0">
                <div className="flex justify-center w-full">
                    <DailyStreakCard streakleftquiz={todayStreakLeft} streakHistory={weeklyStreakHistory} />
                </div>
                <div className="grid md:grid-cols-2 gap-6 mt-8">
                    <EnterChallengeCard rank={rank} score={score} />
                    <ProgressCard total={problemStats.total} solved={problemStats.solved} correct={correctStats.correct} todayCorrect={correctStats.todayCorrect} todayTotal={totalToday}/>
                </div>
                <div className="grid md:grid-cols-2 gap-6 mt-8">
                    <BadgeCard/>
                </div>
            </div>
        </>
    );
}
