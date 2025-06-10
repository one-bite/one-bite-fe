"use client";

import {useState, useEffect } from "react";
import LogSideCard from "app/_components/card/LogSideCard";
import LogCard from "app/_components/card/LogCard";
import {ProblemHistory} from "@/app/_configs/types/problemHistory";
import {QuizProblem} from "app/_configs/types/quiz";
import {fetchProblemHistory} from "@/utils/apis/problemHistory";
import {fetchProblem} from "@/utils/apis/problem";

const Log = () => {
    const [selectedProblem, setSelectedProblem] = useState<QuizProblem | null>(null);
    const [selectedHistory, setSelectedHistory] = useState<ProblemHistory | null>(null);

    const [histories, setHistories] = useState<ProblemHistory[]>([]);
    const [problems, setProblems] = useState<QuizProblem[]>([]);
    
    useEffect(() => {
        const loadHistories = async () => {
            try {
                const data = await fetchProblemHistory();
                setHistories(data);
            } catch (error) {
                console.error("문제 이력 불러오기 실패:", error);
            }
        };

        loadHistories();
    }, []);

    useEffect(() => {
        const loadProblems = async () => {
        const loaded: QuizProblem[] = [];
        const seen = new Set<number>();

          for (const h of histories) {
            if (!seen.has(h.problem.problemId)) {
                seen.add(h.problem.problemId);
                try {
                    const p = await fetchProblem(h.problem.problemId);
                    loaded.push(p);
                } catch (e) {
                    console.error(`문제 ${h.problem.problemId} 불러오기 실패`, e);
                }
            }
          }

          setProblems(loaded);
        };

        if (histories.length > 0) loadProblems();
    }, [histories]);

    useEffect(() => {
        if (typeof window === "undefined" || histories.length === 0) return;

        const restoreSelection = async () => {
            const selectedProblemId = sessionStorage.getItem("selectedProblemId");
            const selectedHistoryId = sessionStorage.getItem("selectedHistoryId");

            if (!selectedProblemId || !selectedHistoryId) return;

                const pid = parseInt(selectedProblemId,10);
                const hid = parseInt(selectedHistoryId,10);

                const problem = problems.find(p => p.problemId === pid);
                const history = histories.find(h => h.historyId === hid);

                if (problem && history) {
                    setSelectedProblem(problem);
                    setSelectedHistory(history);
                } else {
                    fetchProblem(pid).then((p) => {
                        if (p) {
                            const h = histories.find(h => h.historyId === hid);
                            if (h) {
                            setSelectedProblem(p);
                            setSelectedHistory(h);
                            }
                        }
                    })
                }

        }

        restoreSelection();

    }, [histories, problems]);

    return (
        <div className="min-h-screen flex justify-center m-0 p-6">
            <div className="flex flex-col md:flex-row m-0 gap-6">
                <div className="flex justify-center min-w-64 w-screen md:w-full md:min-w-[300px] h-full">
                    <LogSideCard histories={histories}
                                 quizProblems={problems}
                                 selectedProblemId={selectedProblem?.problemId}
                    onSelect={(problem, history) => {
                        setSelectedProblem(problem);
                        setSelectedHistory(history);

                        sessionStorage.setItem("selectedProblemId", problem.problemId.toString());
                        sessionStorage.setItem("selectedHistoryId", history.historyId.toString());
                    }}/>
                </div>
                <div className={`${selectedProblem ? "flex" : "hidden"} md:flex justify-center w-screen md:mx-0 mx-0 md:w-full`}>
                    <LogCard problem={selectedProblem} history={selectedHistory} className="overflow-y-auto"/>
                </div>
            </div>
        </div>
    );
};

export default Log;