"use client";

import React from "react";
import PointIcon from "@/app/_components/icon/PointIcon";  // 아이콘 컴포넌트
import MyButton from "@/app/_components/MyButton";  // 버튼 컴포넌트

interface ResultCardProps {
  correctAnswers: number;
  wrongAnswers: number;
  ratingPoints: number;
  gold: number;
}

// ResultItem 컴포넌트 생성
const ResultItem: React.FC<{ label: string; value: string | number; color: string; isRatingPoints?: boolean }> = ({ label, value, color, isRatingPoints }) => {
  return (
    <div className="flex justify-center items-center text-3xl mb-6 px-8 text-center">
      <span className="font-extrabold text-2xl mr-4">{label}</span>  {/* 라벨 굵게 */}
      <span className={`font-extrabold ${isRatingPoints ? "text-6xl" : "text-5xl"} ${color} ml-[80px]`}>{value}</span>  {/* 숫자 굵게 */}
    </div>
  );
};

const ResultCard: React.FC<ResultCardProps> = ({ correctAnswers, wrongAnswers, ratingPoints, gold }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-2xl border-2 border-gray-200 w-full max-w-4xl text-center">
      {/* 상단 여백 추가 */}
      <h1 className="text-6xl font-extrabold text-lime-600 mb-6 mt-4">채점 결과</h1> {/* 제목 크기 조정 및 굵게 */}
      <p className="text-3xl font-extrabold text-gray-700 mb-8">오늘의 <span className="text-red-500">스트릭</span>을 달성했어요!</p> {/* 텍스트 크기 증가 및 굵게 */}

      {/* 채점 결과 */}
      <div className="space-y-6 mb-6">
        <ResultItem label="맞힌 문제 수:" value={correctAnswers} color="text-blue-500" />
        <ResultItem label="틀린 문제 수:" value={wrongAnswers} color="text-red-500" />
        <ResultItem label="총 레이팅 포인트:" value={`+${ratingPoints}`} color="text-orange-600" isRatingPoints={true} />
      </div>

      {/* 골드 아이콘과 금액 */}
      <div className="flex items-center justify-center space-x-4 text-3xl text-red-700 mb-6">
        <span className="font-extrabold text-5xl">+{gold} Gold</span>  {/* 골드 금액 굵게 및 크게 */}
        <PointIcon className="text-yellow-500 size-14" />
      </div>

      {/* 메인 화면으로 돌아가기 버튼 (결과 카드 안에 위치) */}
      <MyButton className="w-1/2 h-14 py-3">
        메인 화면으로 돌아가기
      </MyButton>
    </div>
  );
};

export default ResultCard;
