"use client"

import MainSectionCard from "./MainSectionCard";
import Badge from "@/app/_configs/badge/Badge";
import {TrophyIcon} from "app/_components/icon/TrophyIcon";
import {userBadgeMap} from "app/_configs/badge/userBadgeMap";

export default function BadgeCard() {
    const ownedBadgeIds = Object.keys(userBadgeMap);

    return (
        <MainSectionCard minHeight="240px">
            <div className="flex flex-col justify-between h-full gap-4">
                <div className={"flex flex-row justify-start items-center gap-3"}>
                    <div className={`bg-pink-700 rounded-full p-2.5 flex items-center justify-center`}>
                        <TrophyIcon size={24} className={'text-white'}/>
                    </div>
                    <h2 className="text-xl font-linebold text-pink-600">획득한 뱃지</h2>
                </div>
                <div className="flex flex-row gap-5 items-center overflow-x-scroll">
                    {ownedBadgeIds.map((id)=>{
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
                <a href="#" className="inline-block mt-4 text-indigo-600 text-sm font-semibold hover:underline">
                    전체 뱃지 보기 →
                </a>
            </div>
        </MainSectionCard>
    );
};
