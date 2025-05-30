import React from "react";
import BigCard from "app/_components/base_components/BigCard";

interface ProgressCardProps {
    total: number;
    solved: number;
}

const ProgressCard = ({ total, solved }: ProgressCardProps) => {
    const percent = total === 0 ? 0 : Math.round((solved / total) * 100);

    return (
        <BigCard className="flex flex-col items-center justify-center m-4 w-full h-44 bg-white rounded-3xl">
            <h2 className="text-xl font-extrabold text-gray-800 mb-3 text-center w-full">진척도</h2>
            <div className="flex flex-row items-baseline justify-center gap-2 mb-2 w-full">
                <span className="text-base font-semibold text-gray-700">
                    {solved} / {total}
                </span>
                <span className="text-base font-semibold text-lime-600">({percent}%)</span>
            </div>
            <div className="w-full px-6">
                <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-4 bg-lime-500 rounded-full transition-all duration-300" style={{ width: `${percent}%` }} />
                </div>
            </div>
        </BigCard>
    );
};

export default ProgressCard;
