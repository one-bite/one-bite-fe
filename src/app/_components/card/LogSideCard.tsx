"use client"

import React, {useState} from "react";
import BigCard from "app/_components/base_components/BigCard";
import QuizTypeIndex from "app/_components/options/QuizTypeIndex";
import {QuizProblem} from "app/_configs/types/quiz";
import ProblemItem from "app/_components/sub_components/ProblemItem";
import { ChevronDown, ChevronUp } from "lucide-react";
import {SubmitHistory} from "app/_mocks/submitHistory";

interface LogSideCardProps {
    className?: string
    quizProblems: QuizProblem[]
    onSelect: (problem: QuizProblem, history: SubmitHistory) => void;
    histories: SubmitHistory[]
}

const LogSideCard = ({className="", histories, quizProblems, onSelect} :LogSideCardProps) => {
    const [quizType, setQuizType] = useState<"날짜 별"|"주제 별">("날짜 별");
    const [topicGroups, setTopicGroups] = useState<Record<string, boolean>>({});

    const parseSubmittedAt = (submittedAt: number[]): Date => {
        const [y, m, d, h, min, s, nano] = submittedAt;
        return new Date(y, m - 1, d, h, min, s, Math.floor(nano / 1_000_000));
    };

    const getDateGroup = (date: Date): "오늘" | "어제" | "일주일 이내" | "한 달 이내" | "그 이전" => {
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const diff = today.getTime() - new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
        const days = diff / (1000 * 60 * 60 * 24);

        if (days === 0) return "오늘";
        if (days === 1) return "어제";
        if (days <= 7) return "일주일 이내";
        if (days <= 30) return "한 달 이내";
        return "그 이전";
    };

    const groupByDate = (histories: SubmitHistory[]) => {
        return histories.reduce((acc, h) => {
            const date = parseSubmittedAt(h.submittedAt);
            const group = getDateGroup(date);
            if (!acc[group]) acc[group] = [];
            acc[group].push(h);
            return acc;
        }, {} as Record<string, SubmitHistory[]>);
    };

    const groupByTopic = (histories: SubmitHistory[]) => {
        const grouped: Record<string, SubmitHistory[]> = {};

        histories.forEach((h) => {
            const problem = quizProblems[h.problemId - 1];
            if (!problem) return;

            const topics = problem.topicCodes.length ? problem.topicCodes : ["기타"];

            topics.forEach((topic) => {
                if (!grouped[topic]) grouped[topic] = [];

                // 중복 추가 방지: 같은 문제 ID가 이 토픽 그룹에 이미 있는지 체크
                const alreadyIncluded = grouped[topic].some((item) => item.problemId === h.problemId);
                if (!alreadyIncluded) {
                    grouped[topic].push(h);
                }
            });
        });

        return grouped;
    };

    const toggleGroup = (key: string) => {
        setTopicGroups((prev) => ({ ...prev, [key]: !prev[key]}));
    };

    const groupedByDate = groupByDate(histories);
    const groupedByTopic = groupByTopic(histories);

    return(
        <BigCard className={`w-60 h-[800px] m-1 p-6 justify-start bg-white ${className}`}>
            <div className="mt-1 flex flex-col items-center">
                <p className="font-linebold text-3xl mb-4">문제 목록</p>
                <div className="flex gap-4">
                    <p className="p-1.5 font-line text-base">정렬 기준</p>
                    <QuizTypeIndex onChange={setQuizType} current={quizType}/>
                </div>
            </div>
            <div className="mt-4 p-1 w-full overflow-y-scroll overflow-x-hidden scrollbar-hide">
                {quizType === "날짜 별"
                    ? Object.entries(groupedByDate).map(([group, entries]) => (
                        <div key={group} className="mb-2">
                            <div
                                className="flex justify-between text-lg items-center cursor-pointer font-linebold"
                                onClick={() => toggleGroup(group)}
                            >
                                <span>{group}</span>
                                {topicGroups[group] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                            </div>
                            {topicGroups[group] && (
                                <div className="ml-2 mt-1 space-y-1">
                                    {entries.map((h) => {
                                        const problem = quizProblems[h.problemId - 1];
                                        if (!problem) return null;
                                        return (
                                            <ProblemItem
                                                key={h.historyId}
                                                id={h.historyId}
                                                title={problem.title}
                                                choose={() => onSelect(problem, h)}
                                            />
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    )) : (
                    Object.entries(groupedByTopic).map(([topicId, histories]) => (
                        <div key={topicId} className="mb-2">
                            <div className="flex justify-between text-lg items-center cursor-pointer font-linebold" onClick={() => toggleGroup(topicId)}>
                                <span>{topicId}</span> {/* 이거 아이디에 따라서 맵핑해야 됨 */}
                                {topicGroups[topicId] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                            </div>
                            {topicGroups[topicId] && (
                                <div className="ml-2 mt-1 space-y-1">
                                    {histories.map((h) => {
                                        const problem = quizProblems[h.problemId - 1];
                                        if (!problem) return null;

                                        return (
                                            <ProblemItem
                                                key={h.historyId}
                                                id={h.historyId}
                                                title={problem.title}
                                                choose={() => onSelect(problem, h)}
                                            />
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>
        </BigCard>
    );
};

export default LogSideCard;