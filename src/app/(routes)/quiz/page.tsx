"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { fetchProblems } from "@/utils/apis/problem";
import QuizCard from "@/app/_components/card/QuizCard";
import MyButton from "app/_components/buttons/MyButton";
import ResultModal from "app/_components/modals/ResultModal";

const QuizPage = () => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProblems = async () => {
      try {
        const data = await fetchProblems();
        setProblems(data);
      } catch (error) {
        console.error("문제 불러오기 오류:", error);
        alert("문제를 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    loadProblems();
  }, []);

  const router = useRouter();

  const [currentIndex, setCurrentIndex] = useState(0); // 현재 문제 인덱스
  const [selected, setSelected] = useState<string | null>(null); // 선택한 답
  const [correctCount, setCorrectCount] = useState(0); // 맞힌 문제 수
  const [wrongCount, setWrongCount] = useState(0); // 틀린 문제 수
  const [score, setScore] = useState(0); // 총 점수
  const [showModal, setShowModal] = useState(false); // 모달 표시 여부

  const currentProblem = problems[currentIndex];
  const isLast = currentIndex === problems.length - 1;

  const handleAnswer = (answer: string) => {
    setSelected(answer); // 선택된 답 저장
  };

  const handleSubmit = () => {
    if (!selected) {
      alert("정답을 선택해주세요.");
      return;
    }

    const isCorrect = selected === currentProblem.answer;

    // 맞힌 문제는 점수 부여
    if (isCorrect) {
      setCorrectCount((prev) => prev + 1);
      setScore((prev) => prev + 10);
    } else {
      setWrongCount((prev) => prev + 1);
      setScore((prev) => prev); // 틀리면 점수 변화 없음
    }

    setShowModal(true); // 모달 표시
  };

  const handleNext = () => {
    if (isLast) {
      // 마지막 문제에서 결과 페이지로 이동
      router.push(`/results?score=${score}&correct=${correctCount}&wrong=${wrongCount}`);
    } else {
      // 다음 문제로 넘어가기
      setCurrentIndex((prev) => prev + 1); // 문제 인덱스를 증가시켜 다음 문제로
      setSelected(null); // 답 초기화
      setShowModal(false); // 모달 닫기
    }
  };

  const handleAskAI = () => {
    console.log("AI에게 질문!");
  };

  if (loading || problems.length === 0) {
    return <div className="text-center mt-10">문제를 불러오는 중입니다...</div>;
  }

  return (
    <div className="m-12 min-h-screen p-4">
      <div className="flex justify-center">
        <QuizCard
            leftStreak={problems.length - currentIndex}
            subject={currentProblem.title}
            question={currentProblem.description.question}
            options={currentProblem.description.options}
            selected={selected}
            onSelect={handleAnswer}
        />
      </div>

      <div className="flex justify-center mt-8 gap-4">
        <MyButton
          className="bg-gradient-to-r from-indigo-600 to-purple-500 shadow-purple-900 hover:bg-purple-600 active:shadow-purple-900"
          onClick={handleAskAI}
        >
          AI에 질문하기
        </MyButton>
        <MyButton onClick={handleSubmit}>
          {isLast ? "결과 보기 →" : "정답 제출 →"}
        </MyButton>
      </div>

      <ResultModal
        isOpen={showModal}
        isCorrect={selected === currentProblem.answer}
        score={score}
        remaining={problems.length - currentIndex - 1}
        gold={correctCount * 10}
        onNext={handleNext}
        isLast={isLast}
      />
    </div>
  );
};

export default QuizPage;
