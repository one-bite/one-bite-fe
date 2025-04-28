"use client";

import StreakIcon from "app/_components/icon/StreakIcon";
import TierIcon from "app/_components/icon/TierIcon";
import { getStreak, getPoint, getRank } from "@/utils/user";
import { useState, useEffect } from "react";

export default function UserStats() {
    //const streak = getStreak();
    //const point = getPoint();
    //const rank = getRank();

    const [streak, setStreak] = useState(getStreak());
    const [point, setPoint] = useState(getPoint());
    const [rank, setRank] = useState(getRank());

    useEffect(() => {
        const handleStorageChange = () => {
            setStreak(getStreak());
            setPoint(getPoint());
            setRank(getRank());
        };

        window.addEventListener("userStatsUpdated", handleStorageChange);
        return () => {
            window.removeEventListener("userStatsUpdated", handleStorageChange);
        };
    }, []); // []// 빈 배열을 의존성 배열로 사용하여 컴포넌트가 처음 마운트될 때만 실행

    return (
        <div className="flex items-center gap-2">
            {/* Streak */}
            <div className="flex justify-between min-w-20 h-8 items-end gap-1 bg-white px-3 py-1 rounded-full">
                <StreakIcon className="size-6 text-red-500" />
                <span className="text-red-900 text-sm font-linebold">{streak.totalStreak}</span>
            </div>

            {/* Points */}
            <div className="flex justify-between min-w-20 h-8 items-center gap-1 bg-white px-3 py-1 rounded-full">
                <h4 className="text-lg font-linebold text-lime-600">P</h4>
                <span className="text-lime-600 text-sm font-linebold">{point}</span>
            </div>

            {/* Lives */}
            <div className="flex justify-between min-w-20 h-8 items-end gap-1 bg-white px-3 py-1 rounded-full">
                <TierIcon className="size-6 text-gray-500" />
                <span className="text-gray-700 text-sm font-linebold">{rank.rank}</span>
            </div>
        </div>
    );
}
