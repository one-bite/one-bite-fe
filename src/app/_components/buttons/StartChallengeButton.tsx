"use client"

import BigButton from "app/_components/base_components/BigButton";
import {useRouter} from "next/navigation";

const StartChallengeButton = () => {
    const router = useRouter();

    const handleClick = () => {
        router.push(`/challenge`)
    }

    return (
        <BigButton
            className={"flex items-center justify-center gap-2 w-64 h-12 text-white text-base font-line font-bold bg-lime-500 rounded-2xl shadow-[0_3px_0_#65A30D] /* lime-600 */ hover:bg-lime-400 active:translate-y-[3px] active:shadow-[0_-3px_0_#65A30D] transition-all duration-150 ease-in-out"}
            onClick={handleClick}
        >
            역량평가 하러가기
        </BigButton>
    )
};

export default StartChallengeButton;