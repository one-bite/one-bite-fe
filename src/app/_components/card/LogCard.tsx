"use client"

import BigCard from "app/_components/base_components/BigCard";
import QuizCard from "app/_components/card/QuizCard";
import ProblemExplainationButton from "app/_components/buttons/ProblemExplainationButton";
import {QuizProblem} from "app/_configs/types/quiz";
import {SubmitHistory} from "app/_mocks/submitHistory";

interface BigCardProps {
    className?: string;
    problem: QuizProblem | null;
    history: SubmitHistory | null;
}

const LogCard = ({ className = "", problem, history }:BigCardProps) => {
    if (!problem) {
        return (
            <BigCard className={`w-[600px] h-3/4 m-1 bg-white ${className}`}>
                <div className={'m-4'}>
                    <p className="font-linebold text-2xl text-gray-400">문제를 선택해주세요.</p>
                </div>
            </BigCard>
        )
    }

    const correctAnswer = problem.description.options[parseInt(problem.answer) - 1];

    return (
        <BigCard className={`flex flex-col items-start w-full h-[800px] mt-1 mx-0 bg-white ${className} `}>
            <div className="min-w-[660px] w-full p-4">
                <QuizCard
                    subject={`${problem.topicCodes}`}
                    title={problem.title}
                    question={problem.description.question}
                    options={problem.description.options}
                    selected={history?.submittedAnswer ?? null}
                    onSelect={() => {}}
                    isCorrect={history ? problem.answer === history.submittedAnswer : null}
                    correctAnswer={correctAnswer}
                    className="w-full shadow-none m-0"
                />
            </div>
            <div className="flex flex-col w-full h-full p-4 pb-0 mb-4 justify-center items-center">
                <BigCard className="w-full h-4/5 mx-1 my-0 border border-gray-400 shadow-none">
                    <p>이 카드는 해설 출력에 사용될 예정입니다.</p>
                </BigCard>
                <ProblemExplainationButton onClick={()=>{}}/>
            </div>
        </BigCard>
    );
};

export default LogCard;