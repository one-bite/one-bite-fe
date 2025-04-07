"use client";

import { Flame, Star, Heart } from "lucide-react";

export default function UserStats() {
    const streak = 12;
    const points = 1350;
    const lives = 3;

    return (
        <div className="flex items-center gap-2">
            {/* Streak */}
            <div className="flex items-center gap-1 bg-white/10 px-3 py-1 rounded-full">
                <Flame size={18} className="text-orange-500" />
                <span className="text-white text-sm font-medium">{streak}</span>
            </div>

            {/* Points */}
            <div className="flex items-center gap-1 bg-white/10 px-3 py-1 rounded-full">
                <Star size={18} className="text-yellow-400" />
                <span className="text-white text-sm font-medium">{points}</span>
            </div>

            {/* Lives */}
            <div className="flex items-center gap-1 bg-white/10 px-3 py-1 rounded-full">
                <Heart size={18} className="text-rose-500" />
                <span className="text-white text-sm font-medium">{lives}</span>
            </div>
        </div>
    );
}
