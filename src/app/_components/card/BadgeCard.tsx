"use client"

import MainSectionCard from "./MainSectionCard";
import Badge from "@/app/_configs/badge/Badge";
import {TrophyIcon} from "app/_components/icon/TrophyIcon";
import {userBadgeMap} from "app/_configs/badge/userBadgeMap";

export default function BadgeCard() {
    const ownedBadgeIds = Object.keys(userBadgeMap);

    const levelOrder = ["Diamond", "Platinum", "Gold", "Silver", "Bronze", "Iron"];

    const sortedBadgeIds = ownedBadgeIds.sort((a, b) => {
        const levelA = userBadgeMap[a].level;
        const levelB = userBadgeMap[b].level;
        return levelOrder.indexOf(levelA) - levelOrder.indexOf(levelB);
    });

    const topBadges = sortedBadgeIds.slice(0, 3);

    return (
        <MainSectionCard minHeight="240px" className={'md:col-span-2'}>
            <div className="flex flex-col justify-betweenl w-full h-full gap-4">
                <div className={"flex flex-row justify-start items-center gap-3"}>
                    <div className={`bg-pink-700 rounded-full p-2.5 flex items-center justify-center`}>
                        <TrophyIcon size={24} className={'text-white'}/>
                    </div>
                    <h2 className="text-xl font-linebold text-pink-600">획득한 뱃지</h2>
                </div>
                <div
                    className="md:hidden flex flex-wrap gap-2 items-center justify-center w-full md:w-full h-full bg-gray-100 rounded-lg overflow-x-auto md:max-w-full">
                    {topBadges.map((id) => {
                        const {level} = userBadgeMap[id];
                        return (
                            <Badge
                                key={id}
                                id={id}
                                level={level}
                            />
                        )
                    })}
                </div>
                <div
                    className="hidden md:flex flex-wrap gap-2 items-center justify-center w-full md:w-full h-full bg-gray-100 rounded-lg overflow-x-auto md:max-w-full">
                    {ownedBadgeIds.map((id) => {
                        const {level} = userBadgeMap[id];
                        return (
                            <Badge
                                key={id}
                                id={id}
                                level={level}
                            />
                        )
                    })}
                </div>
            </div>
        </MainSectionCard>
    );
};
