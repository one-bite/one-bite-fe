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
        const restoreSelection = async () => {
            const selectedProblemId = sessionStorage.getItem("selectedProblemId");
            const selectedHistoryId = sessionStorage.getItem("selectedHistoryId");

            if (selectedProblemId && selectedHistoryId) {
                const pid = parseInt(selectedProblemId,10);
                const hid = parseInt(selectedProblemId,10);

                const problem = await fetchProblem(pid);
                const history = histories.find(h => h.historyId === hid);

                if (problem && history) {
                    setSelectedProblem(problem);
                    setSelectedHistory(history);
                }
            }
        }

        if (histories.length > 0) {
            restoreSelection();
        }

    }, [histories]);

    return (
        <div className="min-h-screen flex justify-center m-0 p-6">
            <div className="flex flex-col md:flex-row m-0 gap-6">
                <div className="flex justify-center min-w-64 w-screen md:w-1/4 h-screen">
                    <LogSideCard histories={histories}
                    quizProblems={problems}
                    onSelect={(problem, history) => {
                        setSelectedProblem(problem);
                        setSelectedHistory(history);

                        sessionStorage.setItem("selectedProblemId", problem.problemId.toString());
                        sessionStorage.setItem("selectedHistoryId", history.historyId.toString());
                    }}/>
                </div>
                <div className={`${selectedProblem ? "block" : "hidden"} md:block flex justify-center w-screen md:mx-0 mx-0 md:w-3/4`}>
                    <LogCard problem={selectedProblem} history={selectedHistory} className="overflow-y-auto"/>
                </div>
            </div>
        </div>
    );
};

export default Log;