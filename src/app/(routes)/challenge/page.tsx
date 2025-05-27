"use client";

import { useState, useEffect } from "react";
import { fetchTodayProblems } from "@/utils/apis/todayProblem";
import { submitTodayProblem } from "@/utils/apis/submitTodayProblem";
import { TodayQuizResponse } from "app/_configs/types/quiz";
import MyButton from "app/_components/buttons/MyButton";
//import ResultModal from "app/_components/modals/ResultModal";
//import { quizProblems } from "@/app/_mocks/quizProblems_local"; //mock 데이터 사용
import {addScore, subtractScore} from "@/utils/user";
import { useRouter } from "next/navigation";
import {Spinner} from "@nextui-org/react";
//import {QuizProblem} from "app/_configs/types/quiz"; //mocks 용
import {ArrowRight} from "lucide-react";
import ChallengeCard from "app/_components/card/ChallengeCard";

const QuizPage = () => {
    const router = useRouter();

    const [lives, setLives] = useState(3);

    const [quizData, setQuizData] = useState<TodayQuizResponse | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0); // 현재 문제 인덱스
    const [isSolved, setIsSolved] = useState(false); // 문제 풀었는지 여부

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadProblems = async () => {
            try {
                setIsLoading(true);
                const data = await fetchTodayProblems();
                console.log("응답 형태:", data);

                // 문제가 없을 경우 처리
                if (!data || !data.problemList || data.problemList.length === 0) {
                    setQuizData(null);
                } else {
                    setQuizData(data);
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
    }, [quizData, currentIndex]); // quizData 처음 로드 시와 currentIndex 변경 시에 실행

/* mocks 용 코드
    useEffect(() => {
        setQuizData(quizProblems);
        setIsLoading(false);
    }, []);
*/

    const [selected, setSelected] = useState<string | null>(null); // 선택한 답
    const [correctCount, setCorrectCount] = useState(0); // 맞힌 문제 수
    const [wrongCount, setWrongCount] = useState(0); // 틀린 문제 수
    const [rankPoint, setRankPoint] = useState(0); // 총 레이팅 포인트 획득
    const [reward, setReward] = useState(0); // 총 포인트 획득
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
    //const isLast = currentIndex === (quizData.problemList.length - 1);
    const outOfLives = lives <= 0;
    const isEnd = (isLast && isSolved) || outOfLives;

    const handleAnswer = (answer: string) => {
        setSelected(answer); // 선택된 답 저장
    };

    const handleSubmit = async() => {
        if (!selected) {
            alert("정답을 선택해주세요.");
            return;
        }

        const problemId = quizData.problemList[currentIndex].problemId;
        const result = await submitTodayProblem(problemId, selected); // 이부분 역량평가 채점 api로 변경 필요
        setIsCorrect(result.correct); // 정답 여부 저장
        setRankPoint((prev) => (prev) + result.score); // 획득한 점수 합산

        if (result.correct) {
            setCorrectCount((prev) => prev + 1);
            setReward((prev) => (prev) + 10); // 획득한 포인트 합산
            addScore(result.score); // 유저 스코어에 반영
        }
        else {
            setWrongCount((prev) => prev + 1);
            subtractScore(result.score); // 유저 스코어에 반영
            setLives((prev) => {
                const nextLives = prev - 1;
                if (nextLives <= 0) {
                    router.push(`/results?type=challenge&score=${rankPoint}&reward=${reward}&correct=${correctCount}&wrong=${wrongCount + 1}`);
                }
                return nextLives;
            });
        }

        if (result.correct || lives - 1 > 0) { // 정답이거나 목숨이 남았으면 다음 문제로 이동
            setCurrentIndex((prev) => prev + 1);
            setSelected(null);
        }
        //setLatestScore(result.score); // 최근 점수 저장
        setIsSolved(true);
    };

    const handleNext = () => {
        setSelected(null); // 답 초기화
        setIsCorrect(null); // 정답 여부 초기화
        setIsSolved(false); // 문제 풀었음 초기화

        if (isEnd) {
            // 마지막 문제에서 결과 페이지로 이동
            router.push(`/results?type=challenge&score=${rankPoint}&reward=${reward}&correct=${correctCount}&wrong=${wrongCount}`);
            return;
        }
        setCurrentIndex((prev) => prev + 1); // 문제 인덱스를 증가시켜 다음 문제로
    };

/*    const handleprev = () => {
        console.log("이전 문제로!");
    };
*/
    return (
        <div className="m-12 min-h-screen p-4">
            <div className="flex justify-center">
                <ChallengeCard
                    title={currentProblem.title}
                    question={currentProblem.description.question}
                    options={currentProblem.description.options}
                    selected={selected}
                    onSelect={handleAnswer}
                    isCorrect={isCorrect}
                    correctAnswer={currentProblem.answer}
                    generatedByAI = {currentProblem.ai}
<<<<<<< Updated upstream
                    questionType={currentProblem.type}
=======
                    questionType={currentProblem.questionType}
>>>>>>> Stashed changes
                    lives={lives}
                    //topic={currentProblem.topic} //토픽도 주도록 api 수정 요청청
                />
            </div>

            <div className="flex justify-end mt-8 mr-16 gap-4">
                {!isSolved && (
                    <MyButton onClick={handleSubmit} disabled={!selected} className={"w-48 h-12 p-4 bg-purple-700 shadow-purple-900 hover:bg-purple-500 hover:shadow-purple-900 active:shadow-purple-900"}>
                        정답 제출<ArrowRight/>
                    </MyButton>
                )}

                {isSolved && (
                    <MyButton onClick={handleNext} className={"w-48 h-12 p-4 bg-purple-700 shadow-purple-900 hover:bg-purple-500 hover:shadow-purple-900 active:shadow-purple-900"}>
                        {isEnd ? "결과 확인하기" : "다음 문제로"}
                    </MyButton>
                )}
            </div>
        </div>
    );
};

export default QuizPage;
