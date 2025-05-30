"use client";

import MainSectionCard from "./MainSectionCard";

interface ProgressCardProps {
    total: number;
    solved: number;
}

const ProgressCard = ({ total, solved }: ProgressCardProps) => {
    const percent = total === 0 ? 0 : Math.round((solved / total) * 100);

    return (
        <MainSectionCard minHeight="160px">
            <div className="flex flex-col h-full justify-between">
                <div>
                    <div className="text-lg font-semibold text-gray-900">진척도</div>
                    <div className="text-xl font-bold text-indigo-600 mt-1">
                        {solved}/{total} <span className="text-gray-500 text-base">({percent}%)</span>
                    </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 md:h-4 mt-4">
                    <div className="bg-lime-500 h-2 md:h-4 rounded-full transition-all duration-300" style={{ width: `${percent}%` }} />
                </div>
            </div>
        </MainSectionCard>
    );
};

export default ProgressCard;
