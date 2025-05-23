"use client"

import React from "react";
import BigCard from "app/_components/base_components/BigCard";
import {Spinner} from "@nextui-org/react";
import {Logo} from "app/_components/icon/LogoIcon";

interface ExplanationViewerProps {
    explanation: string | null;
    isLoading: boolean;
}

const ExplanationViewer = ({ explanation, isLoading }: ExplanationViewerProps) => {
    return (
        <BigCard className="w-full h-4/5 mx-1 my-0 border border-gray-400 shadow-none p-4 overflow-y-auto">
            {isLoading ? (
                <div className="flex justify-center items-center h-full">
                    <Spinner label="AI 해설 생성 중..." color="primary" />
                </div>
            ) : explanation ? (
                <div className={"self-start w-full h-full m-1"}>
                    <div className="flex items-center w-full text-left text-base font-line leading-relaxed whitespace-pre-wrap text-gray-900">
                        <div className={"rounded-full bg-lime-500 w-9 h-9 mr-4"}><Logo/></div>
                        <span>{explanation}</span>
                    </div>
                </div>
            ) : (
                <p className="text-gray-500 text-lg text-center font-linebold">
                    개념 확인 버튼을 눌러 AI 해설을 확인해보세요.
                </p>
            )}
        </BigCard>
    );
};


export default ExplanationViewer;