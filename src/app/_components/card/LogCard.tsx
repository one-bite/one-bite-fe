"use client"

import BigCard from "app/_components/base_components/BigCard";
import QuizCard from "app/_components/card/QuizCard";
import ProblemExplainationButton from "app/_components/buttons/ProblemExplainationButton";
import {useEffect, useState} from "react";
import ExplanationViewer from "app/_components/sub_components/ExplanationViewer";
import AIGenerateProblemButton from "app/_components/buttons/AIGenerateProblemButton";
import {QuizProblem, AiProblemRequest} from "app/_configs/types/quiz";
import {ProblemHistory} from "@/app/_configs/types/problemHistory";
import {fetchCommentary} from "@/utils/apis/commentary";
import { useRouter } from "next/navigation";


interface LogCardProps {
    className?: string;
    problem: QuizProblem | null;
    history: ProblemHistory | null;
}

const LogCard = ({ className = "", problem, history }:LogCardProps) => {
    const router = useRouter();
    const [explanation, setExplanation] = useState<string|null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        setExplanation(null);
        setIsLoading(false);
    }, [problem]);

    if (!problem) {
        return (
            <BigCard className={`flex flex-col justify-center items-start md:w-[800px] w-full h-full min-h-[800px] mt-1 mx-6 p-2 bg-white ${className}`}>
                <div className={'m-4'}>
                    <p className="font-linebold text-2xl text-gray-400">문제를 선택해주세요.</p>
                </div>
            </BigCard>
        )
    }

    const correctAnswer = problem.answer;

    const handlegenerateAiProblem = async () => {
        if (!problem || !history) return;


        const payload: AiProblemRequest = {
            parentProblemId: problem.problemId,
            description: problem.description,
            topics: history?.problem.topics.map(t => t.code) || [],
            questionType: problem.questionType,
        };

        const encoded = encodeURIComponent(JSON.stringify(payload));
        router.push(`/quiz-ai?payload=${encoded}`);
    
        
    }

    let AIproblemId: number;
    if (problem.ai == true) {
        AIproblemId = 0;
    } else {
        AIproblemId = problem.problemId;
    }

         

    return (
        <BigCard className={`flex flex-col justify-center items-start md:w-[800px] w-full h-full min-h-[800px] mt-1 mx-6 p-2 bg-white ${className} `}>
            <div className="md:min-w-[660px] w-full p-4">
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
                <div className={"flex flex-col md:flex-row"}>
                    <ProblemExplainationButton className={"justify-center items-center"} onClick={async ()=>{
                        if(!problem || !history) return;
                        setIsLoading(true);

                        try {
                            const commentary = await fetchCommentary(AIproblemId, problem.description);
                            setExplanation(commentary.commentary);
                        } catch {
                            setExplanation("AI 해설을 불러올 수 없습니다.");
                        } finally {
                            setIsLoading(false);
                        }
                    }}/>
                    <AIGenerateProblemButton onClick={handlegenerateAiProblem}/>
                </div>
            </div>
        </BigCard>
    );
};

export default LogCard;