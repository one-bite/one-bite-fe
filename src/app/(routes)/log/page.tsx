"use client";

import {useState, useEffect } from "react";
import LogSideCard from "app/_components/card/LogSideCard";
import LogCard from "app/_components/card/LogCard";
import {ProblemHistory} from "@/app/_configs/types/problemHistory";
import {QuizProblem} from "app/_configs/types/quiz";
import {fetchProblemHistory} from "@/utils/apis/problemHistory";
import {fetchProblem} from "@/utils/apis/problem";
//import {problemHistory} from "app/_mocks/problemHistory";
//import {quizProblems} from "app/_mocks/quizProblems_local";


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
        if (!seen.has(h.problemId)) {
          seen.add(h.problemId);
          try {
            const p = await fetchProblem(h.problemId);
            loaded.push(p);
          } catch (e) {
            console.error(`문제 ${h.problemId} 불러오기 실패`, e);
          }
        }
      }

      setProblems(loaded);
    };

    if (histories.length > 0) loadProblems();
  }, [histories]);

    return (
        <div className="min-h-screen flex m-0 p-6">
            <div className="flex m-0">
                <div className="flex-1 min-w-64 w-1/4 mr-0">
                    <LogSideCard histories={histories}
                    quizProblems={problems}
                    onSelect={(problem, history) => {
                        setSelectedProblem(problem);
                        setSelectedHistory(history);
                    }}/>
                </div>
                <div className="flex-[3] w-3/4">
                    <LogCard problem={selectedProblem} history={selectedHistory}/>
                </div>
            </div>
        </div>
    );
};

export default Log;