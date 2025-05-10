"use client"

import BigCard from "app/_components/base_components/BigCard";
import {QuizProblem} from "app/_mocks/quizProblems";
import React, {useState} from "react";
import QuizCard from "app/_components/card/QuizCard";

interface BigCardProps{
    className?: string;
    problem: QuizProblem | null;
}

const LogCard = ({className = "", problem}:BigCardProps) => {
    const [selected, setSelected] = useState<string | null>(null);

    if (!problem) {
        return (
            <BigCard className={`w-[600] h-3/4 m-1 bg-white ${className}`}>
                <div className={'m-4'}>
                    <p className="font-linebold text-2xl text-gray-400">문제를 선택해주세요.</p>
                </div>
            </BigCard>
        )
    }

    return(
        <div className={"w-full h-full"}>
            <QuizCard
                subject={`${problem.topicId}`}
                title={problem.title}
                question={problem.description}
                options={problem.options}
                selected={selected}
                onSelect={setSelected}
                className={`w-[600] h-3/4 m-1 bg-white ${className}`}
            />
            <BigCard className={""}/>
        </div>
    );
};

export default LogCard;