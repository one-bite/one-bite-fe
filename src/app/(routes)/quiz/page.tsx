"use client";

import { Button, Card, CardBody } from "@nextui-org/react";
import React from "react";
import MyButton from "app/_components/MyButton";

const Quiz = () => {
    const handle = () => {
        console.log("클릭됨");
    };

    return (
        <div className="min-h-screen">
            <div className="flex justify-center m-4 text-gray-500 text-xs">
                <p>문제 풀이 페이지</p>
            </div>
            <div className="flex gap-4">
                <MyButton className="bg-purple-500 hover:bg-purple-600" onClick={handle}>
                    AI에게 물어보기
                </MyButton>
                <MyButton onClick={handle}>정답 제출 →</MyButton>
            </div>
        </div>
    );
};

export default Quiz;
