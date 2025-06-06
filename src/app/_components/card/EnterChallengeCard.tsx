"use client";

import MainSectionCard from "./MainSectionCard";
import {useRouter} from "next/navigation";
import {Logo} from "app/_components/icon/LogoIcon";
import { getRankColor } from "@/utils/user";

interface EnterChallengeCardProps {
    rank: string;
    score: number
}


const EnterChallengeCard = ({ rank, score }: EnterChallengeCardProps) => {
    const router = useRouter();

    const handleClick = () => {
        router.push(`/challenge`);
    };

    const { textColor, badgeColor } = getRankColor(rank);

    return (
        <MainSectionCard minHeight="160px">
            <div className="flex flex-col justify-between h-full gap-1 md:gap-4">
                <div className={"flex flex-row"}>
                    <div className="flex items-start gap-3 w-1/2">
                        <div className={`bg-purple-800 rounded-full p-1 flex items-center justify-center`}>
                            <Logo size={36}/>
                        </div>
                        <div className={"my-2 gap-1"}>
                            <div className="flex text-xl max-w-1/2 font-linebold text-purple-700">현재 랭크</div>
                            <div className={`${badgeColor} mx-2 md:mx-5 rounded-full pt-1 px-0.5 flex items-center justify-center mt-4 md:mt-5`}>
                                <Logo size={80}/>
                            </div>
                        </div>
                    </div>
                    <div className={"flex justify-center items-center w-1/2"}>
                        <div className={"flex flex-col items-center gap-4 mt-4"}>
                            <div className="text-xl font-linebold text-purple-800 mt-1">점수 :
                                <span className="font-linebold text-gray-700"> {score}pt</span>
                            </div>
                            <div className={`${textColor} font-linebold text-3xl`}>{rank}</div>
                        </div>
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
