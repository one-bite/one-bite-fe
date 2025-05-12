"use client";

import { useState, /*useEffect*/ } from "react";
//import { fetchTodayProblems } from "@/utils/apis/problem";
//import { TodayQuizResponse } from "app/_configs/types/quiz";
import QuizCard from "@/app/_components/card/QuizCard";
import MyButton from "app/_components/buttons/MyButton";
import ResultModal from "app/_components/modals/ResultModal";
import { quizProblems } from "@/app/_mocks/quizProblems_local"; //mock 데이터 사용
import {getStreak, decreaseTodayQuizLeft, addPoint, addScore, subtractScore, UserStreakData} from "@/utils/user";
import { useRouter } from "next/navigation";
const QuizPage = () => {

  const [todayStreak, setTodayStreak] = useState<UserStreakData>(getStreak());

  
  //const [quizData, setQuizData] = useState<TodayQuizResponse | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0); // 현재 문제 인덱스
  const [isSolved, setIsSolved] = useState(false); // 문제 풀었는지 여부
  /*
  useEffect(() => {
    const loadProblems = async () => {
      try {
        const data = await fetchTodayProblems();
        console.log("응답 형태:", data);
        setQuizData(data);
      } catch (error) {
        console.error("문제 불러오기 오류:", error);
      }
    };

    loadProblems();
  }, []);
  */
 /*
  useEffect(() => {
    if (quizData) {
      setIsSolved(quizData.problemStatus[currentIndex]); // 현재 문제 풀었는지 여부
    }
  }, [quizData, currentIndex]); // quizData 처음 로드 시와 currentIndex 변경 시에 실행
*/
  const router = useRouter();

  const quizData = quizProblems; //mock 데이터 사용

  
  const [selected, setSelected] = useState<string | null>(null); // 선택한 답
  const [latestScore, setLatestScore] = useState(0); // 최근 점수
  const [correctCount, setCorrectCount] = useState(0); // 맞힌 문제 수
  const [wrongCount, setWrongCount] = useState(0); // 틀린 문제 수
  const [score, setScore] = useState(0); // 총 레이팅 포인트 획득
  const [reward, setReward] = useState(0); // 총 포인트 획득
  const [showModal, setShowModal] = useState(false); // 모달 표시 여부
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  if (!quizData) {
    return <div className="text-center mt-10">문제를 불러오는 중입니다...</div>;
  }

  //const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const currentProblem = quizData/*.problemList*/[currentIndex];
  const isLast = currentIndex === (quizData/*.problemList*/.length - 1);

  const correctScore = currentProblem.point;  // 정답일 때 점수
  const wrongScore = 7; // 오답일 때 점수
  const rewardPoint = 10; // 정답일 때 포인트 **api 수정 요청**

  const handleAnswer = (answer: string) => {
    setSelected(answer); // 선택된 답 저장
  };

  const handleSubmit = async() => {
    if (!selected) {
      alert("정답을 선택해주세요.");
      return;
    }
/*
    const problemId = quizData.problemList[currentIndex].problemId;
    const userId = 2; // 현재 로그인한 유저의 ID를 가져와야 함..

    try {
      const response = await fetch(`${apiUrl}/submit/${problemId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
        },
        body: JSON.stringify({
          userId: userId,
          answer: selected, 
          solveTime: 0, //임시
      })
    });

    if(!response.ok) {
      const errorText = await response.text();
      console.error("문제 제출 실패", errorText);
    }
    const result = await response.json();
    setIsCorrect(result.correct); // 정답 여부 저장
    setScore((prev) => (prev) + result.score); // 획득한 점수 합산
    if (isCorrect) {
      setCorrectCount((prev) => prev + 1);
      setReward((prev) => (prev) + 10); // 획득한 포인트 합산
      addScore(result.score); // 유저 스코어에 반영
    } else {
      setWrongCount((prev) => prev + 1);
      subtractScore(result.score); // 유저 스코어에 반영
    }
    setLatestScore(result.score); // 최근 점수 저장
*/
    //mock 데이터 사용
    const answerNum = parseInt(currentProblem.answer);
    const correct = selected === currentProblem.description.options[answerNum - 1]; // 정답 여부 확인
    setIsCorrect(correct);
    if (correct) {
      setCorrectCount((prev) => prev + 1);
      setScore((prev) => prev + correctScore);  // 정답일때 
      setReward((prev) => prev + rewardPoint); // 정답이면 10포인트
      addScore(correctScore);
    } else {
      setWrongCount((prev) => prev + 1);
      setScore((prev) => prev - wrongScore); // 오답일 때 -7점
      subtractScore(wrongScore); // 점수 감소
    }
    setLatestScore(correct ? correctScore : wrongScore); // 최근 점수 저장

    setShowModal(true); // 모달 표시
    setIsSolved(true); // 문제 풀었음 표시
  /*
  } catch (error) {
      console.error("채점 중 오류:", error);
    }
      */
  };

  const handleNext = () => {
    decreaseTodayQuizLeft();
    setTodayStreak(getStreak());
    
    setSelected(null); // 답 초기화
    setIsCorrect(null); // 정답 여부 초기화
    setIsSolved(false); // 문제 풀었음 초기화

    if(isSolved) {
      if (isCorrect) {
        addPoint(rewardPoint); // 포인트 추가
      }
    }
    if (isLast) {
      // 마지막 문제에서 결과 페이지로 이동
      router.push(`/results?score=${score}&reward=${reward}&correct=${correctCount}&wrong=${wrongCount}`);
    }
    setCurrentIndex((prev) => prev + 1); // 문제 인덱스를 증가시켜 다음 문제로
  };

  const handleprev = () => {
    console.log("이전 문제로!");
  };

  

  return (
    <div className="m-12 min-h-screen p-4">
      <div className="flex justify-center">
        <QuizCard
            leftStreak={todayStreak.todayStreakQuizLeft} // 스트릭까지 남은 문제 수
            title={currentProblem.title}
            question={currentProblem.description.question}
            options={currentProblem.description.options}
            selected={selected}
            onSelect={handleAnswer}
            isCorrect={isCorrect}
            correctAnswer={currentProblem.answer} //description.answer로
        />
      </div>

      <div className="flex justify-center mt-8 gap-4">
        <MyButton
          className="bg-gradient-to-r from-indigo-600 to-purple-500 shadow-purple-900 hover:bg-purple-600 active:shadow-purple-900"
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

      <ResultModal
        isOpen={showModal}
        isCorrect={isCorrect ?? false}
        score={latestScore}
        remaining={todayStreak.todayStreakQuizLeft - 1} //정답일 때만 표시할 것이니 -1해서 넘겨줌.
        point={rewardPoint}  // 정답일 때 포인트
        onClose={() => setShowModal(false) }
      />
    </div>
  );
};

export default QuizPage;
