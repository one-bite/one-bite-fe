"use client"

import BigCard from "app/_components/base_components/BigCard";

interface ProgressCardProps {
    total: number;
    solved: number
}

const ProgressCard = ({total, solved}:ProgressCardProps) => {
    const percent = total === 0 ? 0 : Math.round((solved/total)*100);

    return (
        <BigCard className="flex m-4 w-full h-64 bg-white">
            <div className="flex justify-between mb-1 text-sm font-medium">
                <span>진척도</span>
                <span>
                    {solved} / {total} ({percent}%)
                </span>
            </div>
            <div className="w-3/4 bg-gray-200 rounded-full h-4 m-8">
                <div
                    className="bg-lime-500 h-4 rounded-full transition-all duration-300"
                    style={{width: `${percent}%`}}
                />
            </div>
        </BigCard>
    )
}

export default ProgressCard