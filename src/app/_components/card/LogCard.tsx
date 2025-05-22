"use client"

import BigCard from "app/_components/base_components/BigCard";
import QuizCard from "app/_components/card/QuizCard";
import ProblemExplainationButton from "app/_components/buttons/ProblemExplainationButton";
import {useEffect, useState} from "react";
import ExplanationViewer from "app/_components/sub_components/ExplanationViewer";
import AIGenerateProblemButton from "app/_components/buttons/AIGenerateProblemButton";
import {QuizProblem} from "app/_configs/types/quiz";
import {ProblemHistory} from "@/app/_configs/types/problemHistory";


interface BigCardProps {
    className?: string;
    problem: QuizProblem | null;
    history: ProblemHistory | null;
}

const LogCard = ({ className = "", problem, history }:BigCardProps) => {
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
                        if(!problem) return;
                        setIsLoading(true);
                        //api호출 부분
                        setTimeout(()=>{
                            setExplanation("이 문제에 대한 AI의 개념 설명입니다."); //api로 받은 ai 설명 변수를 넣을 위치
                            setIsLoading(false);
                        }, 1200);
                    }}/>
                    <AIGenerateProblemButton onClick={()=>{/*여기에 유사 유형 문제 생성하기 위해 전달할 api 변수나 함수*/}}/>
                </div>
            </div>
        </BigCard>
    );
};

export default LogCard;