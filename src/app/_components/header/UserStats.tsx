"use client";

import StreakIcon from "app/_components/icon/StreakIcon";
import GoldIcon from "app/_components/icon/GoldIcon";
import TierIcon from "app/_components/icon/TierIcon";

export default function UserStats() {
    const streak = 3;
    const gold = 850;
    const tier = "실버";

    return (
        <div className="flex items-center gap-2">
            {/* Streak */}
            <div className="flex justify-between min-w-20 items-end gap-1 bg-white px-3 py-1 rounded-full">
                <StreakIcon size={18} />
                <span className="text-red-900 text-sm font-linebold">{streak}</span>
            </div>

            {/* Points */}
            <div className="flex justify-between min-w-20 items-end gap-1 bg-white px-3 py-1 rounded-full">
                <GoldIcon size={18} />
                <span className="text-yellow-900 text-sm font-linebold">{gold}</span>
            </div>

            {/* Lives */}
            <div className="flex justify-between min-w-20 items-end gap-1 bg-white px-3 py-1 rounded-full">
                <TierIcon size={18} className="text-rose-500" />
                <span className="text-gray-700 text-sm font-linebold">{tier}</span>
            </div>
        </div>
    );
}
