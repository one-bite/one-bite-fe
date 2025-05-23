"use client"

import BigCard from "app/_components/base_components/BigCard";

interface ProgressCardProps {
    totalProblems: number;
    solvedProblems: number
}

const ProgressCard = ({totalProblems, solvedProblems}:ProgressCardProps) => {
    const currentProgress = solvedProblems/totalProblems;

    return (
        <BigCard className="flex m-4 w-[560px] h-[232px] bg-white">
            <p>{currentProgress}</p>
        </BigCard>
    )
}

export default ProgressCard