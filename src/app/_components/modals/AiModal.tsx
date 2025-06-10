"use client";

import MyButton from "../buttons/MyButton";

interface AiModalProps {
    isOpen: boolean; //모달 열까 말까
    isCorrect: boolean; //정답 여부
    onClose: () => void; //닫기
}

export default function AiModal({ isOpen, isCorrect, onClose }: AiModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
            <div className="relative bg-white rounded-[30px] w-[360px] px-6 py-8 shadow-xl text-center border-none">
                {/* 닫기 버튼*/}
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 font-semibold">
                    X
                </button>

                <h2 className="text-2xl font-extrabold mb-6">
                    <span className={isCorrect ? "text-lime-500" : "text-red-500"}>{isCorrect ? "정답" : "오답"}</span>
                    {isCorrect ? "입니다!" : "입니다..."}
                </h2>

                <MyButton onClick={onClose} className="w-full text-sm py-3">
                    닫기
                </MyButton>
            </div>
        </div>
    );
}
