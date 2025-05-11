"use client";

import LogSideCard from "app/_components/card/LogSideCard";
import LogCard from "app/_components/card/LogCard";
import {QuizProblem, quizProblems} from "app/_mocks/quizProblems";
import {useState} from "react";


const Log = () => {
    const [selected, setSelected] = useState<QuizProblem | null>(null);

    return (
        <div className="min-h-screen flex m-0 p-6">
            <div className="flex m-0">
                <div className="flex-1 min-w-64 w-1/4 mr-0">
                    <LogSideCard QuizProblems={quizProblems} onSelect={setSelected}/>
                </div>
                <div className="flex-[3] min-w-[660px] w-3/4">
                    <LogCard problem={selected}/>
                </div>
            </div>
        </div>
    );
};

export default Log;