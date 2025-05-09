"use client";

import LogSideCard from "app/_components/card/LogSideCard";
import LogCard from "app/_components/card/LogCard";
import {quizProblems} from "app/_mocks/quizProblems";


const Log = () => {
    return (
        <div className="min-h-screen flex m-0 p-6">
            <div className="flex m-0">
                <div className="flex-1 min-w-64 w-1/4 mr-0">
                    <LogSideCard QuizProblems={quizProblems}/>
                </div>
                <div className="flex-[3] min-w-[660px] w-3/4">
                    <LogCard />
                </div>
            </div>
        </div>
    );
};

export default Log;