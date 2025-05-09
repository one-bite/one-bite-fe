"use client"

import BigCard from "app/_components/base_components/BigCard";

interface BigCardProps{
    className?: string;
}

const LogCard = ({className = ""}:BigCardProps) => {
    return(
        <BigCard className={`w-[600] h-3/4 m-1 bg-white ${className}`}>
            <div className={'m-4'}>
                문제 풀이 내용
            </div>
        </BigCard>
    );
};

export default LogCard;