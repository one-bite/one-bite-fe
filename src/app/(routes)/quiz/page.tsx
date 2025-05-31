"use client";

import {useState, useEffect, Suspense} from "react";
import { fetchTodayProblems } from "@/utils/apis/todayProblem";
import { submitTodayProblem } from "@/utils/apis/submitTodayProblem";
import { TodayQuizResponse } from "app/_configs/types/quiz";
import QuizCard from "@/app/_components/card/QuizCard";
import MyButton from "app/_components/buttons/MyButton";
import TodayModal from "@/app/_components/modals/TodayModal";
import {getStreak, decreaseTodayQuizLeft, UserStreakData} from "@/utils/user";
import {useRouter} from "next/navigation";
import {Spinner} from "@nextui-org/react";
import {fetchProblemHistory} from "@/utils/apis/problemHistory";
import {ProblemHistory} from "app/_configs/types/problemHistory";
const QuizPage = () => {
    const router = useRouter();

    const [todayStreak, setTodayStreak] = useState<UserStreakData>(getStreak());

    const [quizData, setQuizData] = useState<TodayQuizResponse | null>(null);

    const [currentIndex, setCurrentIndex] = useState(0); // 현재 문제 인덱스
    const [isSolved, setIsSolved] = useState<boolean | null>(null); // 문제 풀었는지 여부

    const [isLoading, setIsLoading] = useState(true);

  const [history, setHistory] = useState<ProblemHistory[]>([]);

  const loadHistory = async () => {
    try {
      const data = await fetchProblemHistory();
      setHistory(data);
    } catch (err) {
      console.error("히스토리 로드 실패:", err);
    }
  };

  const restoreFromHistory = (index: number) => {
    if (!quizData) return;
    const pid = quizData.problemList[index].problemId;
    const hist = history.find(h => h.problem.problemId === pid);

    if (hist) {
      setSelected(hist.submittedAnswer);
      setIsCorrect(hist.isCorrect);
      setIsSolved(true);
    } else {
      setSelected(null);
      setIsCorrect(null);
      setIsSolved(null);
    }
  };

  useEffect(() => {
      const loadProblems = async () => {
        try {
          setIsLoading(true);
          const data = await fetchTodayProblems();
          console.log("응답 형태:", data);
          loadHistory();

        // 문제가 없을 경우 처리
          if (!data || !data.problemList || data.problemList.length === 0) {
            setQuizData(null);
          } else {
            setQuizData(data);
            const initialIndex = data.problemStatus.findIndex((v) => !v);
            setCurrentIndex(initialIndex >= 0 ? initialIndex : 0);
          }
        } catch (error) {
          console.error("문제 불러오기 오류:", error);
          alert("문제를 불러오는 데 실패했습니다. 메인 화면으로 이동합니다.");
          router.push("/");
        } finally {
          setIsLoading(false);
        }
      };

      loadProblems();
      }, [router]);
  
 
  useEffect(() => {
    if (quizData) {
      setIsSolved(quizData.problemStatus[currentIndex]); // 현재 문제 풀었는지 여부
    }
    restoreFromHistory(currentIndex);
  }, [quizData, currentIndex, history]); // quizData 처음 로드 시와 currentIndex 변경 시에 실행
  
  const [selected, setSelected] = useState<string | null>(null); // 선택한 답
  const [correctCount, setCorrectCount] = useState(0); // 맞힌 문제 수
  const [wrongCount, setWrongCount] = useState(0); // 틀린 문제 수
  const [showModal, setShowModal] = useState(false); // 모달 표시 여부
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  if (isLoading) {
    return (
        <div className="w-full h-[500px] flex flex-col gap-4 items-center justify-center font-line">
          <Spinner color="primary" size="lg"/>
          문제를 불러오는 중입니다...
        </div>
    );
  }

  if (!quizData || quizData.problemList.length === 0) {
    return (
        <div className="w-full h-[500px] flex items-center justify-center text-gray-500 font-line">
          문제가 존재하지 않습니다...
        </div>
    );
  }

  const currentProblem = quizData.problemList[currentIndex];
  const isLast = currentIndex === (quizData.problemList.length - 1);

  const handleAnswer = (answer: string) => {
    setSelected(answer); // 선택된 답 저장
  };

  const handleSubmit = async() => {
    if (!selected) {
      alert("정답을 선택해주세요.");
      return;
    }

    const problemId = quizData.problemList[currentIndex].problemId;

    const result = await submitTodayProblem(problemId, selected);
    setIsCorrect(result.correct); // 정답 여부 저장

    if (isCorrect) {
      setCorrectCount((prev) => prev + 1); // 맞힌 문제 수 증가
    } else {
      setWrongCount((prev) => prev + 1); // 틀린 문제 수 증가
    }

    decreaseTodayQuizLeft();
    setTodayStreak(getStreak());

    await loadHistory();

    setShowModal(true); // 모달 표시
    setIsSolved(true); // 문제 풀었음 표시
      
  };

  const handleNext = () => {
    if (isLast) {
      // 마지막 문제에서 결과 페이지로 이동
      router.push(`/result-streak?correct=${correctCount}&wrong=${wrongCount}`);
      return;
    }
    
    setSelected(null); // 답 초기화
    setIsCorrect(null); // 정답 여부 초기화
    setIsSolved(null); // 문제 풀었음 초기화
    setCurrentIndex((prev) => prev + 1); // 문제 인덱스를 증가시켜 다음 문제로
  };

  const handleprev = () => {
    setCurrentIndex((prev) => prev - 1);
    setIsSolved(true);
  };
  
  return (
      <Suspense fallback={
        <div className="w-full h-[500px] flex flex-col gap-4 items-center justify-center font-line">
          <Spinner color="primary" size="lg"/>
          문제를 불러오는 중입니다...
        </div>
      }>
        <div className="m-12 min-h-screen p-4">
          <div className="flex justify-center">
            <QuizCard
                leftStreak={todayStreak.todayStreakQuizLeft}
                questionType={currentProblem.questionType}
                title={currentProblem.title}
                question={currentProblem.description.question}
                options={currentProblem.description.options}
                selected={selected}
                onSelect={handleAnswer}
                isCorrect={isCorrect}
                correctAnswer={currentProblem.answer}
                generatedByAI={currentProblem.ai}
            />
          </div>

          <div className="flex justify-center mt-8 gap-4">
            <MyButton
                className="bg-lime-500 shadow-lime-900 hover:bg-lime-600 active:shadow-lime-900"
                onClick={handleprev}
                disabled={currentIndex === 0} // 첫 번째 문제일 때 비활성화
            >
              이전 문제로
            </MyButton>

            {!isSolved && !showModal && (
                <MyButton onClick={handleSubmit} disabled={!selected}>
                  정답 제출
                </MyButton>
            )}

            {isSolved && !showModal && (
                <MyButton onClick={handleNext}>
                  {isLast ? "결과 확인하기" : "다음 문제로"}
                </MyButton>
            )}
          </div>

          <TodayModal
              isOpen={showModal}
              isCorrect={isCorrect ?? false}
              remaining={todayStreak.todayStreakQuizLeft} //정답일 때만 표시할 것이니 -1해서 넘겨줌.
              onClose={() => setShowModal(false)}
          />
        </div>
      </Suspense>
  );
};

export default QuizPage;
