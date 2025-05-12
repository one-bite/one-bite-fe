"use client";

import LogSideCard from "app/_components/card/LogSideCard";
import LogCard from "app/_components/card/LogCard";
//import {quizProblems} from "app/_mocks/quizProblems_converted";
import {QuizProblem} from "app/_configs/types/quiz";
import {useState} from "react";
import {mockHistories} from "app/_mocks/mockUserProblemHistory";


const Log = () => {
    const [selected, setSelected] = useState<QuizProblem | null>(null);

    return (
        <div className="min-h-screen flex m-0 p-6">
            <div className="flex m-0">
                <div className="flex-1 min-w-64 w-1/4 mr-0">
                    <LogSideCard histories={mockHistories} onSelect={setSelected}/>
                </div>
                <div className="flex-[3] w-3/4">
                    <LogCard problem={selected}/>
                </div>
            </div>
        </div>
    );
};

export default Log;