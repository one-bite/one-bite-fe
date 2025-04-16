"use client";

import StreakIcon from "app/_components/icon/StreakIcon";
import TierIcon from "app/_components/icon/TierIcon";

export default function UserStats() {
    const streak = 3;
    const gold = 850;
    const tier = "실버";

    return (
        <div className="flex items-center gap-2">
            {/* Streak */}
            <div className="flex justify-between min-w-20 h-8 items-end gap-1 bg-white px-3 py-1 rounded-full">
                <StreakIcon className="size-6 text-red-500" />
                <span className="text-red-900 text-sm font-linebold">{streak}</span>
            </div>

            {/* Points */}
            <div className="flex justify-between min-w-20 h-8 items-center gap-1 bg-white px-3 py-1 rounded-full">
                <h4 className="text-lg font-linebold text-lime-600">P</h4>
                <span className="text-lime-600 text-sm font-linebold">{gold}</span>
            </div>

            {/* Lives */}
            <div className="flex justify-between min-w-20 h-8 items-end gap-1 bg-white px-3 py-1 rounded-full">
                <TierIcon className="size-6 text-gray-500" />
                <span className="text-gray-700 text-sm font-linebold">{tier}</span>
            </div>
        </div>
    );
}
