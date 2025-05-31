"use client";

import MainSectionCard from "./MainSectionCard";
import {useRouter} from "next/navigation";
import {Logo} from "app/_components/icon/LogoIcon";

interface EnterChallengeCardProps {
    rank: string;
    score: number
}

const rankColorMap: Record<string, string> = {
    Iron: "text-gray-500",
    Bronze: "text-amber-700",
    Silver: "text-gray-300",
    Gold: "text-yellow-500",
    Platinum: "text-teal-400",
    Diamond: "text-blue-500",
};

const EnterChallengeCard = ({ rank, score }: EnterChallengeCardProps) => {
    const router = useRouter();

    const handleClick = () => {
        router.push(`/challenge`);
    };

    const colorClass = rankColorMap[rank] ?? "text-gray-800";

    return (
        <MainSectionCard minHeight="160px">
            <div className="flex flex-col justify-between h-full gap-4">
                <div className="flex items-center gap-3">
                    <div className="bg-purple-800 rounded-full p-1 flex items-center justify-center">
                        <Logo size={56}/>
                    </div>
                    <div>
                        <div className="text-xl font-linebold text-purple-700">현재 랭크</div>
                        <div className={`${colorClass} font-linebold text-lg`}>{rank}</div>
                        <div className="text-lg font-line text-gray-500 mt-1">점수: <span className="font-linebold text-gray-700">{score}pt</span></div>
                    </div>
                </div>
                <button
                    className="w-full py-2 rounded-lg bg-purple-700 text-white font-semibold hover:bg-purple-900 transition mt-2"
                    onClick={handleClick}
                >
                    역량평가 시작하기
                </button>
            </div>
        </MainSectionCard>
    );
};

export default EnterChallengeCard;
