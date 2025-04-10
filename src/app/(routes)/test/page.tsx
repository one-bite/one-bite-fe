"use client";

import { useState } from "react";
import MyButton from "@/app/_components/MyButton";
import ResultModal from "@/app/_components/quiz/ResultModal";

export default function Test() {
    const [showModal, setshowModal] = useState(false);

    const handleAskAI = () => {
        console.log("AI 물어보기 클릭됨");
    };

    const handleSubmit = () => {
        console.log("제출 클릭됨");
        setshowModal(true);
    };

    const handleNext = () => {
        console.log("다음 문제로 이동");
        setshowModal(false);
    };

    return (
        <main className="min-h-screen bg-white flex items-center justify-center p-8">
            <div className="flex flex-col items-center space-y-6">
                <div className="flex gap-4">
                    <MyButton className="bg-purple-500 hover:bg-purple-600" onClick={handleAskAI}>
                        AI에게 물어보기
                    </MyButton>
                    <MyButton onClick={handleSubmit}>정답 제출 →</MyButton>
                </div>
            </div>

            <ResultModal isOpen={showModal} isCorrect={true} score={28} remaining={8} gold={12} onNext={handleNext}/>
        </main>
    );
}
