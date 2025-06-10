"use client"

import React from "react";
import BigCard from "app/_components/base_components/BigCard";
import { Spinner } from "@nextui-org/react";
import { Logo } from "app/_components/icon/LogoIcon";
import ReactMarkdown from "react-markdown"

interface ExplanationViewerProps {
    explanation: string | null;
    isLoading: boolean;
}

const ExplanationViewer = ({ explanation, isLoading }: ExplanationViewerProps) => {
    return (
        <BigCard className="w-full max-h-[400px] mx-4 my-0 border border-gray-400 shadow-none p-4 overflow-y-auto">
            {isLoading ? (
                <div className="flex justify-center items-center h-full">
                    <Spinner label="AI 해설 생성 중..." color="primary" />
                </div>
            ) : explanation ? (
                <div className={"self-start w-full h-full m-1"}>
                    <div className="flex items-start mb-4">
                        <div className={"rounded-full bg-lime-500 w-9 h-9 mr-4"}>
                            <Logo/>
                        </div>
                        <div className="prose prose-sm prose-slate max-w-none font-line leading-tight text-gray-900">
                            <ReactMarkdown>{explanation}</ReactMarkdown>
                        </div>
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