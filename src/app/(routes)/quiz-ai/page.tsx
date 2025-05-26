"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { generateAiProblem } from "@/utils/apis/problemAi";
import { AiProblemRequest, AiProblemResponse } from "@/app/_configs/types/quiz";
import QuizCard from "@/app/_components/card/QuizCard";
import MyButton from "@/app/_components/buttons/MyButton";

const QuizAIPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [problem, setProblem] = useState<AiProblemResponse | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isCorrect, setisCorrect] = useState<boolean | null>(null);

  useEffect(() => {
    const payloadStr = searchParams.get("payload");
    if (!payloadStr) return;

    const fetchProblem = async () => {
      try {
        setLoading(true);
        const payload: AiProblemRequest = JSON.parse(decodeURIComponent(payloadStr));
        console.log("AI 문제 생성 요청:", payload);
        alert(payloadStr);
        const data = await generateAiProblem(payload);
        setProblem(data);
      } catch (e) {
        console.error("AI 문제 생성 실패", e);
      } finally {
        setLoading(false);
      }
    };

    fetchProblem();
  }, [searchParams]);

  const handleSubmit = () => {
    if (!selected || !problem) return;

    const isCorrect = selected === problem.answer;
    setisCorrect(isCorrect);

    if (isCorrect) {
      alert("정답입니다! 이전 페이지로 돌아갑니다.");
      router.back();
    } else {
      alert("오답입니다! 다시 시도하세요.");
      setSelected(null); // 선택 초기화
      setisCorrect(null); // 정답 상태 초기화
    }
  };

  if (loading) return <div>문제를 생성 중입니다...</div>;
  if (!problem) return <div>문제가 없습니다.</div>;

  return (
    <div className="m-12 flex flex-col items-center gap-6">
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

      <MyButton onClick={handleSubmit} disabled={!selected}>
        제출하기
      </MyButton>
    </div>
  );
};

export default QuizAIPage;
