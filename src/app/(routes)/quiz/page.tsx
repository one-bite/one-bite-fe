"use client";

import { useState/*, useEffect*/ } from "react";
import { useRouter } from "next/navigation";
//import { fetchProblems } from "@/utils/apis/problem";
import QuizCard from "@/app/_components/card/QuizCard";
import MyButton from "app/_components/buttons/MyButton";
import ResultModal from "app/_components/modals/ResultModal";
//import {QuizProblem} from "app/_configs/types/quiz";
import { quizProblems } from "@/app/_mocks/quizProblems";
import { getStreak, decreaseTodayQuizLeft, addPoint , addScore, subtractScore} from "@/utils/user";

const QuizPage = () => {

  const todaystreak = getStreak(); // 오늘의 스트릭 남은 문제 수

  /*
  const [problems, setProblems] = useState<QuizProblem[]>([]);
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
  */
  const router = useRouter();

  const [currentIndex, setCurrentIndex] = useState(0); // 현재 문제 인덱스
  const [selected, setSelected] = useState<string | null>(null); // 선택한 답
  const [correctCount, setCorrectCount] = useState(0); // 맞힌 문제 수
  const [wrongCount, setWrongCount] = useState(0); // 틀린 문제 수
  const [score, setScore] = useState(0); // 총 레이팅 포인트 획득
  const [reward, setReward] = useState(0); // 총 포인트 획득
  const [showModal, setShowModal] = useState(false); // 모달 표시 여부
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const correctScore = 23;  // 정답일 때 점수
  const wrongScore = 7; // 오답일 때 점수
  const rewardPoint = 10; // 정답일 때 포인트

//mock 데이터 사용 중
  const currentProblem = quizProblems[currentIndex];
  const isLast = ((todaystreak.todayStreakQuizLeft - 1) === 0);

  const handleAnswer = (answer: string) => {
    setSelected(answer); // 선택된 답 저장
  };

  const handleSubmit = () => {
    if (!selected) {
      alert("정답을 선택해주세요.");
      return;
    }

    const correct = selected === currentProblem.answer;
    setIsCorrect(correct);

    // 맞힌 문제는 점수 부여
    if (correct) {
      setCorrectCount((prev) => prev + 1);
      setScore((prev) => prev + correctScore);  // 정답일 때 23점 획득
      setReward((prev) => prev + rewardPoint); // 정답이면 10포인트
      addScore(correctScore);
    } else {
      setWrongCount((prev) => prev + 1);
      setScore(7); // 오답일 때 -7점
      subtractScore(wrongScore); // 점수 감소
    }

    setShowModal(true); // 모달 표시
  };

  const handleNext = () => {

    if(isCorrect) {
      decreaseTodayQuizLeft();
      addPoint(rewardPoint);
    }
    if (isLast) {
      // 마지막 문제에서 결과 페이지로 이동
      router.push(`/results?score=${score}&reward=${reward}&correct=${correctCount}&wrong=${wrongCount}`);
    } else {
      // 다음 문제로 넘어가기
      setCurrentIndex((prev) => prev + 1); // 문제 인덱스를 증가시켜 다음 문제로
      setSelected(null); // 답 초기화
      setIsCorrect(null); // 정답 여부 초기화
      setShowModal(false); // 모달 닫기
    }
  };

  const handleAskAI = () => {
    console.log("AI에게 질문!");
  };
/*
  if (loading || problems.length === 0) {
    return <div className="text-center mt-10">문제를 불러오는 중입니다...</div>;
  }
*/
  return (
    <div className="m-12 min-h-screen p-4">
      <div className="flex justify-center">
        <QuizCard
            leftStreak={todaystreak.todayStreakQuizLeft} // 스트릭까지 남은 문제 수
            subject={currentProblem.title}
            question={currentProblem.description} //description.question으로
            options={currentProblem.options}  //description.options로
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
        isCorrect={isCorrect ?? false}
        score={isCorrect ? correctScore : wrongScore}
        remaining={todaystreak.todayStreakQuizLeft - 1} //정답일 때만 표시할 것이니 -1해서 넘겨줌.
        point={rewardPoint}  // 정답일 때 포인트
        onNextAction={handleNext}
        isLast={isLast}
      />
    </div>
  );
};

export default QuizPage;
