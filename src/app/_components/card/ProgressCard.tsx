"use client";

import MainSectionCard from "./MainSectionCard";
import CircleGraph from "app/_components/graph/CircleGraph";

interface ProgressCardProps {
    total: number;
    solved: number;
    correct: number;
    recentCorrect: number;
    recentTotal: number;
}

const ProgressCard = ({ total, solved, correct, recentCorrect, recentTotal }: ProgressCardProps) => {
    const solvedPercent = total === 0 ? 0 : Math.round((solved / total) * 100);
    const correctRate = solved === 0 ? 0 : Math.round((correct / solved) * 100);
    const recentCorrectRate = solved === 0 ? 0 : Math.round((recentCorrect / recentTotal) * 100);

    return (
        <MainSectionCard minHeight="160px">
            <div className="flex h-full justify-center gap-6 items-center">
                <CircleGraph value={solvedPercent} title={"풀이 진척도"} color={"indigo"} size={72}/>
                <CircleGraph value={correctRate} title={"전체 정답률"} color={"blue"} size={72}/>
                <CircleGraph value={recentCorrectRate} title={"최근 30문제 정답률"} color={"lime"} size={72}/>
            </div>
        </MainSectionCard>
    );
};

export default ProgressCard;
