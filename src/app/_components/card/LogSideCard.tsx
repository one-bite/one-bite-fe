"use client"

import React, {useState} from "react";
import BigCard from "app/_components/base_components/BigCard";
import QuizTypeIndex from "app/_components/options/QuizTypeIndex";
//import {QuizProblem} from "app/_configs/types/quiz";
import {QuizProblem} from "app/_mocks/quizProblems";
import ProblemItem from "app/_components/sub_components/ProblemItem";
import { ChevronDown, ChevronUp } from "lucide-react";

interface LogSideCardProps {
    className?: string
    QuizProblems: QuizProblem[]
    currentAlign?: string
    onSelect: (problem: QuizProblem) => void;
}

const LogSideCard = ({className="", QuizProblems, onSelect} :LogSideCardProps) => {
    const [quizType, setQuizType] = useState<"날짜 별"|"유형 별">("날짜 별");

    const topicGroup = QuizProblems.reduce((acc, cur) => {
        const key = cur.topicId;
        if (!acc[key]) acc[key] = [];
        acc[key].push(cur);
        return acc;
    }, {} as Record<string, QuizProblem[]>);

    const [topicGroups, setTopicGroups] = useState<Record<string, boolean>>({});

    const toggleGroup = (key: string) => {
        setTopicGroups((prev) => ({ ...prev, [key]: !prev[key]}));
    };

    return(
        <BigCard className={`w-60 h-3/4 m-1 p-6 justify-start bg-white ${className}`}>
            <div className="mt-1 flex flex-col items-center">
                <p className="font-linebold text-3xl mb-4">문제 목록</p>
                <div className="flex gap-4">
                    <p className="p-1.5 font-line text-base">정렬 기준</p>
                    <QuizTypeIndex onChange={setQuizType} current={quizType}/>
                </div>
            </div>
            <div className="mt-4 p-1 w-full overflow-y-scroll overflow-x-hidden scrollbar-hide">
                {Object.entries(topicGroup).map(([topicId, problems]) => (
                    <div key={topicId} className="mb-2">
                        <div className="flex justify-between items-center cursor-pointer font-linebold" onClick={() => toggleGroup(topicId)}>
                            <span>{topicId}</span> {/* 이거 아이디에 따라서 맵핑해야 됨 */}
                            {topicGroups[topicId] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </div>
                        {topicGroups[topicId] && (
                            <div className="ml-2 mt-1 space-y-1">
                                {problems.sort((a, b) => a.id - b.id).map((p) => (
                                        <ProblemItem key={p.id} id={p.id} title={p.title} choose={() => onSelect(p)}/>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </BigCard>
    );
};

export default LogSideCard;