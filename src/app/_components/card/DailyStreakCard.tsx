"use client";

import React from "react";
import BigCard from "app/_components/base_components/BigCard"
import StreakIcon from "app/_components/icon/StreakIcon";
import StartQuizButton from "app/_components/buttons/StartQuizButton";

const DailyStreakCard = () => {
    return(
        <BigCard className="m-16 w-[880px] border border-lime-400">
            <div className="flex justify-between">
                <div className="flex justify-center items-center p-8 w-1/2
                                bg-[radial-gradient(ellipse_at_bottom,_rgba(251,146,60,0.3),_transparent_80%)]">
                    <StreakIcon className="m-4 size-32 text-red-500"/>
                    <div>
                        <p className="text-lg font-linebold">오늘 스트릭 달성까지</p>
                        <h1 className="text-3xl font-linebold">
                            <span className="text-4xl text-orange-500 font-linebold">{8/*남은 스트릭 변수*/}문제</span>
                            남았어요!
                        </h1>
                    </div>
                </div>
                <div className="flex flex-col justify-center items-center p-8 pl-0 w-1/2 gap-4">
                    <div className="w-full text-center font-linebold">여기에 사용자의 이번주 스트릭 확인 UI 구현</div>
                    <StartQuizButton className="self-center" subject="Python"/>
                </div>
            </div>
        </BigCard>
    );
}

export default DailyStreakCard;