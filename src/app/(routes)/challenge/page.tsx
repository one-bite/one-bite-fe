"use client";

import { useState, useEffect } from "react";
import { fetchChallengeProblems } from "@/utils/apis/challengeProblem";
import { submitChallenge } from "@/utils/apis/submitChallenge";
import { ChallengeResponse } from "app/_configs/types/quiz";
import QuizCard from "@/app/_components/card/QuizCard";
import MyButton from "app/_components/buttons/MyButton";
import ChallengeModal from "@/app/_components/modals/ChallengeModal";
import { useRouter } from "next/navigation";
import {Spinner} from "@nextui-org/react";
import {ArrowRight} from "lucide-react";
import { useCallback } from "react";

const ChallengePage = () => {
    const router = useRouter();

    const [lives, setLives] = useState(3); // 남은 목숨
    const [isOver, setIsOver] = useState(false); // 게임 오버 여부
    const [score, setScore] = useState(0); // 총 점수 획득
    const [challengeData, setChallengeData] = useState<ChallengeResponse | null>(null);
    const [point, setPoint] = useState(0); // 문제별 점수
    const [isSolved, setIsSolved] = useState(false);

    const [selected, setSelected] = useState<string | null>(null); // 선택한 답
    const [correctCount, setCorrectCount] = useState(0); // 맞힌 문제 수
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [showModal, setShowModal] = useState(false); // 모달 표시 여부

    const [isLoading, setIsLoading] = useState(true);

    const loadProblems = useCallback(async () => {
            try {
                setIsLoading(true);
                const data = await fetchChallengeProblems();
                console.log("응답 형태:", data);

                // 문제가 없을 경우 처리
                if (!data || !data.problem) {
                    setChallengeData(null);
                } else {
                    setChallengeData(data);
                    setLives(data.leftChance); // 남은 목숨 설정
                    setScore(data.score); // 문제 불어올때마다 지금까지 얻은 점수 갱신
                    setPoint(data.problem.point); // 문제별 점수
                }
            } catch (error) {
                console.error("문제 불러오기 오류:", error);
                alert("문제를 불러오는 데 실패했습니다. 메인 화면으로 이동합니다.");
                router.push("/");
            } finally {
                setIsLoading(false);
            }
        }, [router]);


    useEffect(() => {
        loadProblems();
    }, [loadProblems]);


    

    if (isLoading) {
        return (
            <div className="w-full h-[500px] flex flex-col gap-4 items-center justify-center font-line">
                <Spinner color="primary" size="lg"/>
                문제를 불러오는 중입니다...
            </div>
        );
    }

    if (!challengeData?.problem) {
        return (
            <div className="w-full h-[500px] flex items-center justify-center text-gray-500 font-line">
                문제가 존재하지 않습니다...
            </div>
        );
    }



    const currentProblem = challengeData.problem;

    const handleAnswer = (answer: string) => {
        setSelected(answer);
    };

    const handleSubmit = async() => {
        if (!selected) {
            alert("정답을 선택해주세요.");
            return;
        }

        const problemId = challengeData.problem.problemId;
        const result = await submitChallenge(problemId, selected);
        setIsOver(result.gameOver); // 게임 오버 여부
        setIsCorrect(result.correct); // 정답 여부
        setScore(result.score); // 획득한 총 점수 갱신

        if (isCorrect) {
            setCorrectCount((prev) => prev + 1);
        }

        setShowModal(true);
        setIsSolved(true);
    };

    const handleNext = async() => {
        if (isOver) {
            // 게임 오버면 결과 페이지로.
            router.push(`/result-challenge?score=${score}&correct=${correctCount}`);
            return;
        }
        setSelected(null); // 답 초기화
        setIsCorrect(null); // 정답 여부 초기화
        setIsSolved(false); // 문제 풀었음 초기화
        setShowModal(false); // 모달 닫기

        await loadProblems(); // 다음 문제 불러오기
    };

    return (
        <div className="m-12 min-h-screen p-4">
            <div className="flex justify-center">
                <QuizCard
                    title={currentProblem.title}
                    question={currentProblem.description.question}
                    options={currentProblem.description.options}
                    selected={selected}
                    onSelect={handleAnswer}
                    isCorrect={isCorrect}
                    correctAnswer={currentProblem.answer}
                    questionType={currentProblem.questionType}
                    generatedByAI ={currentProblem.ai}
                    lives={lives}
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
                        {isOver ? "결과 확인하기" : "다음 문제로"}
                    </MyButton>
                )}
            </div>

            <ChallengeModal
                isOpen={showModal}
                isCorrect={isCorrect ?? false}
                point={point}
                lives={challengeData.leftChance}
                onClose={() => setShowModal(false) }
            />
        </div>
    );
};

export default ChallengePage;
