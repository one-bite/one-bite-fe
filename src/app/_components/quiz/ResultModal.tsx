"use client";

import StreakIcon from "../icon/StreakIcon";
import PointIcon from "../icon/PointIcon";
import MyButton from "../MyButton";

interface ResultModalProps {
    isOpen: boolean; //모달 열까 말까
    isCorrect: boolean; //정답 여부
    score: number; // 스코어 변화
    remaining?: number; // 남은 문제 수. 정답일 때만 표시
    gold?: number; // 보상. 정답일 때만 표시
    onNext: () => void; //닫기 or 다음 문제로 넘어가기
}

export default function ResultModal({ isOpen, isCorrect, score, remaining, gold, onNext }: ResultModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
            <div className="bg-white rounded-[30px] w-[360px] px-6 py-8 shadow-xl text-center border-none">
                {/* 제목 */}
                <h2 className="text-2xl font-extrabold mb-6">
                    <span className={isCorrect ? "text-lime-500" : "text-red-500"}>{isCorrect ? "정답" : "오답"}</span>
                    {isCorrect ? "입니다!" : "입니다..."}
                </h2>

                {/* 점수 */}
                <div className={`flex justify-center items-baseline gap-2 text-6xl font-extrabold mb-1 ${isCorrect ? "text-blue-500" : "text-orange-400"}`}>
                    {isCorrect ? `+ ${score}` : `- ${score}`}
                    <div className="text-xs mb-6">레이팅 포인트</div>
                </div>

                {/* 정답일 때만 추가 정보 */}
                {isCorrect && (
                    <div className="flex flex-col items-center text-sm text-gray-800 gap-2 mb-6">
                        <div className="flex items-center gap-2 text-red-500">
                            <StreakIcon className="w-4 h-4"/>
                            <span className="font-semibold">{remaining} Problems Left</span>
                        </div>
                        <div className="flex items-center gap-2  text-yellow-500">
                            <PointIcon className="w-4 h-4"/>
                            <span className="font-semibold">+ {gold} Gold</span>
                        </div>
                    </div>
                )}

                {/* 버튼 */}
                <MyButton onClick={onNext} className="w-full text-sm py-3">
                    {isCorrect ? "다음 문제로 이동" : "다시 풀어보기"}
                </MyButton>
            </div>
        </div>
    );
}
