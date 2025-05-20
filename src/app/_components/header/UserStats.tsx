"use client";

import StreakIcon from "app/_components/icon/StreakIcon";
import TierIcon from "app/_components/icon/TierIcon";
//import { getStreak, getRank } from "@/utils/user";
//import { useState, useEffect } from "react";

interface userStatData {
    streak: number;
    rank: string;
}


export default function UserStats({ streak, rank } : userStatData) {
    //const streak = getStreak();
    //const rank = getRank();

/*  //props로 유저 스탯 받아오기 **유저 스탯은 그냥 출려만 함**

    const [streak, setStreak] = useState(getStreak());
    const [point, setPoint] = useState(getPoint());
    const [rank, setRank] = useState(getRank());

    useEffect(() => {
        const handleStorageChange = () => {
            setStreak(getStreak());
            setRank(getRank());
        };

        window.addEventListener("userStatsUpdated", handleStorageChange);
        return () => {
            window.removeEventListener("userStatsUpdated", handleStorageChange);
        };
    }, []);
*/

    return (
        <div className="flex items-center gap-2">
            {/* Streak */}
            <div className="flex justify-between min-w-20 h-8 items-end gap-1 bg-white px-3 py-1 rounded-full">
                <StreakIcon className="size-6 text-red-500" />
                <span className="text-red-900 text-sm font-linebold">{streak}</span>
            </div>

            {/* Lives */}
            <div className="flex justify-between min-w-20 h-8 items-end gap-1 bg-white px-3 py-1 rounded-full">
                <TierIcon className="size-6 text-gray-500" />
                <span className="text-gray-700 text-sm font-linebold">{rank}</span>
            </div>
        </div>
    );
}
