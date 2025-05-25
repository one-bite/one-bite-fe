"use client"

import BigCard from "app/_components/base_components/BigCard";
import QuizCard from "app/_components/card/QuizCard";
import ProblemExplainationButton from "app/_components/buttons/ProblemExplainationButton";
import {useEffect, useState} from "react";
import ExplanationViewer from "app/_components/sub_components/ExplanationViewer";
import AIGenerateProblemButton from "app/_components/buttons/AIGenerateProblemButton";
import {QuizProblem} from "app/_configs/types/quiz";
import {ProblemHistory} from "@/app/_configs/types/problemHistory";
import {fetchCommentary} from "@/utils/apis/commentary";


interface LogCardProps {
    className?: string;
    problem: QuizProblem | null;
    history: ProblemHistory | null;
}

const LogCard = ({ className = "", problem, history }:LogCardProps) => {
    const [explanation, setExplanation] = useState<string|null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        setExplanation(null);
        setIsLoading(false);
    }, [problem]);

    if (!problem) {
        return (
            <BigCard className={`w-[600px] h-3/4 m-1 bg-white ${className}`}>
                <div className={'m-4'}>
                    <p className="font-linebold text-2xl text-gray-400">문제를 선택해주세요.</p>
                </div>
            </BigCard>
        )
    }

    const correctAnswer = problem.answer;

// ai 해설 요청을 위한 문제 설명 description
    /*function makeDescriptionForAI(problem: QuizProblem, history: ProblemHistory) {
        return `
        제목: ${history.problem.title}
        주제: ${history.problem.topics ?.map(t => t.name).join(", ") || ""}
        질문: ${problem.description.question}
        선택지: ${problem.description.options?.map((opt, i) => `${i + 1}) ${opt}`).join(", ") || ""}
        문제 유형: ${problem.questionType}
        정답: ${problem.answer} (${problem.description.options?.[parseInt(problem.answer) - 1] || ""})
        제출 답안: ${history?.submittedAnswer ? `${history.submittedAnswer} (${problem.description.options?.[parseInt(history.submittedAnswer) - 1] || ""})` : "미제출"}
        정답 여부: ${problem.answer === history?.submittedAnswer ? "정답" : "오답"}
        `;
    }*/

    let AIproblemId: number;
    if (problem.ai == true) {
        AIproblemId = 0;
    } else {
        AIproblemId = problem.problemId;
    }

         

    return (
        <BigCard className={`flex flex-col items-start w-full h-[800px] mt-1 mx-0 bg-white ${className} `}>
            <div className="min-w-[660px] w-full p-4">
                <QuizCard
                    topic={`${history?.problem.topics.map((t) => t.name)}`}
                    title={problem.title}
                    question={problem.description.question}
                    options={problem.description.options}
                    selected={history?.submittedAnswer ?? null}
                    onSelect={() => {}}
                    isCorrect={history ? problem.answer === history.submittedAnswer : null}
                    correctAnswer={correctAnswer}
                    className="w-full shadow-none m-0"
                    generatedByAI={problem.ai}
                    questionType={problem.questionType}
                />
            </div>

            <div className="flex flex-col w-full h-full p-4 pb-0 mb-4 justify-center items-center">
                <ExplanationViewer explanation={explanation} isLoading={isLoading}/>
                <div className={"flex flex-row"}>
                    <ProblemExplainationButton className={"justify-center items-center"} onClick={async ()=>{
                        if(!problem || !history) return;
                        setIsLoading(true);

                        try {
                            //const description = makeDescriptionForAI(problem, history);
                            const commentary = await fetchCommentary(AIproblemId, problem.description);
                            setExplanation(commentary);
                        } catch {
                            setExplanation("AI 해설을 불러올 수 없습니다.");
                        } finally {
                            setIsLoading(false);
                        }
                    }}/>
                    <AIGenerateProblemButton onClick={()=>{/*여기에 유사 유형 문제 생성하기 위해 전달할 api 변수나 함수*/}}/>
                </div>
            </div>
        </BigCard>
    );
};

export default LogCard;