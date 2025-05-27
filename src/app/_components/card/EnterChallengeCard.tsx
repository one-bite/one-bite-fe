"use client";

import React from "react";
import BigCard from "app/_components/base_components/BigCard"
import StartChallengeButton from "app/_components/buttons/StartChallengeButton";

interface EnterChallengeCardProps {
    currentRank: number;
    rankPoint: number;
}

const EnterChallengeCard = ({ currentRank, rankPoint }: EnterChallengeCardProps) => {
    return(
        <BigCard className="m-8 w-[880px] h-[220px]">
            <div className="flex justify-between">
                <div className="flex justify-center items-center p-8 w-1/2">
                    현재 랭크 포인트 : {currentRank}, ({rankPoint})
                </div>
                <div className="flex justify-center items-center p-8 w-1/2">
                    <StartChallengeButton/>
                </div>
            </div>
        </BigCard>
    );
};

export default EnterChallengeCard;