"use client"

import BigCard from "app/_components/base_components/BigCard";
import {QuizProblem} from "app/_mocks/quizProblems";
import QuizCard from "app/_components/card/QuizCard";
import ProblemExplainationButton from "app/_components/buttons/ProblemExplainationButton";

interface BigCardProps{
    className?: string;
    problem: QuizProblem | null; // 통신 연결 시 LogSideCard 증 ProblemItem에서 id 불러오도록 해서 그 id로 정보 받아올 생각인데 잘 모르겠다.
}

const LogCard = ({ className = "", problem }:BigCardProps) => {
    if (!problem) {
        return (
            <BigCard className={`w-[600px] h-3/4 m-1 bg-white ${className}`}>
                <div className={'m-4'}>
                    <p className="font-linebold text-2xl text-gray-400">문제를 선택해주세요.</p>
                </div>
            </BigCard>
        )
    }

    return (
        <BigCard className={`flex flex-col items-start w-full h-full mt-1 mx-0 bg-white ${className} `}>
            <div className="min-w-[660px] w-full p-4">
                <QuizCard
                    subject={`${problem.topicId}`}
                    title={problem.title}
                    question={problem.description}
                    options={problem.options}
                    selected={problem.answer}
                    onSelect={() => {}}
                    className="w-full shadow-none m-0"
                />
            </div>
            <div className="w-full h-full p-4 pb-0 justify-center items-center">
                <BigCard className="w-full h-4/5 mx-1 my-0 border border-gray-400 shadow-none">
                    <p>이 카드는 해설 출력에 사용될 예정입니다.</p>
                </BigCard>
                <ProblemExplainationButton onClick={()=>{}}/>
            </div>
        </BigCard>
    );
};

export default LogCard;