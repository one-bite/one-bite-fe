"use client";

import MyButton from "@/app/_components/MyButton";

export default function test() {
    const handle = () => {
        console.log("클릭됨");
    };

    return (
        <main className="min-h-screen bg-white flex items-center justify-center p-8">
            <div className="flex flex-col items-center space-y-6">
                <div className="flex gap-4">
                    <MyButton className="bg-purple-500 hover:bg-purple-600" onClick={handle}>
                        AI에게 물어보기
                    </MyButton>
                    <MyButton onClick={handle}>정답 제출 →</MyButton>
                </div>
            </div>
        </main>
    );
}
