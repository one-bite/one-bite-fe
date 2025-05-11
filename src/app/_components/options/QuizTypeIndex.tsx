//DropdownButton.tsx를 바탕으로 문제 유형 목록 컴포넌트 구현
"use client"

import DropdownButton from "app/_components/base_components/DropdownButton";

interface QuizTypeIndexProps {
    onChange: (value: "날짜 별" | "유형 별") => void;
    current: "날짜 별" | "유형 별";
}

const QuizTypeIndex = ({ onChange, current } : QuizTypeIndexProps) => {
    return(
        <DropdownButton options={["날짜 별", "유형 별"]} onSelect={(val) => onChange(val as "날짜 별" | "유형 별")} selected={`${current}`}/>
    )
}

export default QuizTypeIndex;