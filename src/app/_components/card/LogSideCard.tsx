"use client"

import React, {useEffect, useState} from "react";
import BigCard from "app/_components/base_components/BigCard";
import QuizTypeIndex from "app/_components/options/QuizTypeIndex";
import {QuizProblem} from "app/_configs/types/quiz";
import ProblemItem from "app/_components/sub_components/ProblemItem";
import { ChevronDown, ChevronUp } from "lucide-react";
import {ProblemHistory} from "@/app/_configs/types/problemHistory";
import {topicNameMap} from "app/constants/topicNameKoreanMap";

interface LogSideCardProps {
    className?: string
    quizProblems: QuizProblem[]
    onSelect: (problem: QuizProblem, history: ProblemHistory) => void;
    histories: ProblemHistory[]
    selectedProblemId?: number
}

const LogSideCard = ({className="", histories, quizProblems, onSelect, selectedProblemId} :LogSideCardProps) => {
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

    const datePriority: Record<string, number> = {
        "오늘": 0,
        "어제": 1,
        "일주일 이내": 2,
        "한 달 이내": 3,
        "그 이전": 4,
    };

    const groupByDate = (histories: ProblemHistory[]) => {
        return histories.reduce((acc, h) => {
            const date = parseSubmittedAt(h.submittedAt);
            const group = getDateGroup(date);
            if (!acc[group]) acc[group] = [];
            acc[group].push(h);
            return acc;
        }, {} as Record<string, ProblemHistory[]>);
    };

    const groupByTopic = (histories: ProblemHistory[]) => {
        const grouped: Record<string, ProblemHistory[]> = {};

        histories.forEach((h) => {
            const problem = quizProblems.find(p => p.problemId === h.problem.problemId);
            if (!problem) return;

            const topics = h.problem.topics.map((t) => t.name).length ? h.problem.topics.map((t) => t.name) : ["기타"];
            //const topics = problem.topicNames.length ? problem.topicNames : ["기타"];

            topics.forEach((topic) => {
                if (!grouped[topic]) grouped[topic] = [];

                // 중복 추가 방지: 같은 문제 ID가 이 토픽 그룹에 이미 있는지 체크
                const alreadyIncluded = grouped[topic].some((item) => item.problem.problemId === h.problem.problemId);
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

    useEffect(() => {
        if (!selectedProblemId || histories.length === 0) return;

        if (quizType === "날짜 별") {
            for (const h of histories) {
                if (h.problem.problemId === selectedProblemId) {
                    const groupKey = getDateGroup(parseSubmittedAt(h.submittedAt));
                    setTopicGroups((prev) => ({ ...prev, [groupKey]: true }));
                    break;
                }
            }
        } else {
            for (const h of histories) {
                if (h.problem.problemId === selectedProblemId) {
                    const topics = h.problem.topics.map((t) => t.name);
                    topics.forEach((t) => {
                        setTopicGroups((prev) => ({ ...prev, [t]: true }));
                    });
                    break;
                }
            }
        }
    }, [selectedProblemId, quizType, histories]);

    return(
        <BigCard className={`min-w-60 w-full max-w-screen md:h-[800px] my-1 mx-6 p-6 justify-start bg-white ${className}`}>
            <div className="mt-1 flex flex-col items-center">
                <p className="font-linebold text-3xl mb-4">문제 목록</p>
                <div className="flex gap-4">
                    <p className="p-1.5 font-line text-base">정렬 기준</p>
                    <QuizTypeIndex onChange={setQuizType} current={quizType}/>
                </div>
            </div>
            <div className="mt-4 p-1 w-full overflow-y-scroll overflow-x-hidden scrollbar-hide">

                {quizType === "날짜 별"
                    ? Object.entries(groupedByDate)
                        .sort(([a], [b]) => {
                            const aPriority = datePriority[a] ?? 999;
                            const bPriority = datePriority[b] ?? 999;
                            return aPriority - bPriority;
                        })
                        .map(([group, entries]) => (
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
                                            const problem = quizProblems.find(p => p.problemId === h.problem.problemId);
                                            if (!problem) return null;
                                            const rawTitle = problem.title?.trim();
                                            const replaceToTopic = (title: string) =>
                                                title.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
                                            const showTitle = rawTitle || replaceToTopic(h.problem.topics[0].name);
                                            return (
                                                <ProblemItem
                                                    key={h.historyId}
                                                    id={h.historyId}
                                                    title={showTitle}
                                                    choose={() => onSelect(problem, h)}
                                                    isCorrect={h.isCorrect}
                                                />
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        ))
                    : (
                        Object.entries(groupedByTopic).map(([topicId, histories]) => (
                        <div key={topicId} className="mb-2">
                            <div className="flex justify-between text-lg items-center cursor-pointer font-linebold" onClick={() => toggleGroup(topicId)}>
                                <span>{topicNameMap[topicId] ?? topicId}</span>
                                {topicGroups[topicId] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                            </div>
                            {topicGroups[topicId] && (
                                <div className="ml-2 mt-1 space-y-1">
                                    {histories.map((h) => {
                                        const problem = quizProblems.find(p => p.problemId === h.problem.problemId);
                                        if (!problem) return null;
                                        const rawTitle = problem.title?.trim();
                                        const replaceToTopic = (title: string) =>
                                            title.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
                                        const showTitle = rawTitle || replaceToTopic(h.problem.topics[0].name);
                                        return (
                                            <ProblemItem
                                                key={h.historyId}
                                                id={h.historyId}
                                                title={showTitle}
                                                choose={() => onSelect(problem, h)}
                                                isCorrect = {h.isCorrect}
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