import { QuizProblem } from "@/app/_configs/types/quiz"; // 문제 타입 재사용

export interface UserProblemHistory {
    historyId: number;
    userId: number;
    problemId: number;
    submittedAnswer: string;
    isCorrect: boolean;
    solveTime: number;
    submittedAt: number[]; // [YYYY, MM, DD, hh, mm, ss, ns]
    problem: QuizProblem;  // 문제 상세 내용 포함 (프론트에서 매핑 필요)
}