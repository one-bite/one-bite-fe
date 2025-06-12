"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { generateAiProblem } from "@/utils/apis/problemAi";
import { AiProblemRequest, AiProblemResponse } from "@/app/_configs/types/quiz";
import QuizCard from "@/app/_components/card/QuizCard";
import MyButton from "@/app/_components/buttons/MyButton";
import AiModal from "@/app/_components/modals/AiModal";

const QuizAI = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [problem, setProblem] = useState<AiProblemResponse | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isCorrect, setisCorrect] = useState<boolean | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isSolved, setIsSolved] = useState(false);
  const [retryKey,setRetryKey] = useState(0);

  useEffect(() => {
    const payloadStr = searchParams.get("payload");
    if (!payloadStr) return;

    const fetchProblem = async () => {
      try {
        setLoading(true);
        const payload: AiProblemRequest = JSON.parse(decodeURIComponent(payloadStr));
        console.log("AI 문제 생성 요청:", payload);
        //alert(payloadStr);
        const data = await generateAiProblem(payload);
        setProblem(data);
      } catch (e) {
        console.error("AI 문제 생성 실패", e);
      } finally {
        setLoading(false);
      }
    };

    fetchProblem();
  }, [searchParams, retryKey]);

  const handleSubmit = () => {
    if (!selected || !problem) return;

    const isCorrect = selected === problem.answer;
    setisCorrect(isCorrect);

    setShowModal(true);
    setIsSolved(true);
  };

  const handleBack = () => {
    router.back();
  }

  const handleRetry = () => {
    setSelected(null);
    setisCorrect(null);
    setIsSolved(false);
    setShowModal(false);
    setRetryKey(prev => prev + 1); // 문제를 다시 생성하기 위해 키를 변경
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        문제를 생성 중입니다...
      </div>
    );
}
  if (!problem) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        문제가 없습니다.
      </div>
    );
  }

  return (
    <div className="m-2 md:m-12 min-h-screen p-4">
      
      <div className="flex justify-center">
          <QuizCard
              title={problem.title}
              question={problem.description.question}
              options={problem.description.options}
              selected={selected}
              onSelect={setSelected}
              isCorrect={isCorrect}
              correctAnswer={problem.answer}
              generatedByAI={true}
              questionType={problem.questionType}
          />
      </div>
      <div className="flex justify-center mt-8 gap-4">
          {isSolved && (isCorrect) && (
            <MyButton onClick={handleBack} disabled={!selected}>
              돌아가기
            </MyButton>
          )}
          {isSolved && (!isCorrect) && (
            <MyButton onClick={handleRetry} disabled={!selected}>
              다시풀기
            </MyButton>
          )}
          {(!isSolved) && (
            <MyButton onClick={handleSubmit} disabled={!selected}>
              제출하기
            </MyButton>
          )}
      </div>
      <div>
        <AiModal
          isOpen={showModal}
          isCorrect={isCorrect ?? false}
          onClose={() => {
            setShowModal(false);
          }}/>
      </div>
    </div>
  );
};

export default function QuizAIPage() {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <QuizAI />
    </Suspense>
  );
}
