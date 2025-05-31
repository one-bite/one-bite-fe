"use client";

import MainSectionCard from "./MainSectionCard";
import CircleGraph from "app/_components/graph/CircleGraph";

interface ProgressCardProps {
    total: number;
    solved: number;
    correct: number;
    todayCorrect: number;
    todayTotal: number;
}

const ProgressCard = ({ total, solved, correct, todayCorrect, todayTotal }: ProgressCardProps) => {
    const solvedPercent = total === 0 ? 0 : Math.round((solved / total) * 100);
    const correctRate = solved === 0 ? 0 : Math.round((correct / solved) * 100);
    const todayCorrectRate = solved === 0 ? 0 : Math.round((todayCorrect / todayTotal) * 100);

    return (
        <MainSectionCard minHeight="160px">
            <div className="flex flex-col h-full justify-center gap-1 items-center py-2">
                <h2 className="text-xl font-linebold text-blue-800">진척도</h2>

                <div className={"flex justify-center items-center gap-4"}>
                    <CircleGraph value={todayCorrectRate} title={"오늘의 문제 정답률"} color={"lime"} size={80} numerator={todayCorrect} denominator={todayTotal}/>
                    <CircleGraph value={correctRate} title={"누적 정답률"} color={"blue"} size={80} numerator={correct} denominator={solved}/>
                    <CircleGraph value={solvedPercent} title={"풀이 진척도"} color={"indigo"} size={80} numerator={solved} denominator={total}/>
                </div>
            </div>
        </MainSectionCard>
    );
};

export default ProgressCard;
