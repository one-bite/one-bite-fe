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
            className={""}
            onClick={handleClick}
        >
            역량평가 하러가기
        </BigButton>
    )
};

export default StartChallengeButton;