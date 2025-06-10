"use client";

import StreakIcon from "app/_components/icon/StreakIcon";
import {getRankColor} from "@/utils/user";

interface userStatData {
    streak: number;
    rank: string;
}


export default function UserStats({ streak, rank } : userStatData) {

    const { textColor} = getRankColor(rank);

    return (
        <div className="flex items-center gap-2">
            {/* Streak */}
            <div className="flex justify-between min-w-20 h-8 items-end gap-1 bg-white px-3 py-1 rounded-full">
                <StreakIcon className="size-6 text-red-500" />
                <span className="text-red-900 text-sm font-linebold">{streak}</span>
            </div>

            {/* RankTier */}
            <div className="flex justify-between min-w-24 h-8 items-end gap-1 bg-white px-3 py-1 rounded-full">
                <span className={`text-sm font-linebold ${textColor}`}>{rank}</span>
            </div>
        </div>
    );
}
