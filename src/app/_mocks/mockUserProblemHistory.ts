import { UserProblemHistory } from "@/app/_configs/types/userProblemHistory";
import { quizProblems } from "@/app/_mocks/quizProblems_converted";

export const mockHistories: UserProblemHistory[] = [
    {
        historyId: 1,
        userId: 1,
        problemId: 1,
        submittedAnswer: "4",
        isCorrect: false,
        solveTime: 30,
        submittedAt: [2025, 5, 12, 9, 0, 0, 0],
        problem: quizProblems[0]
    },
    {
        historyId: 2,
        userId: 1,
        problemId: 2,
        submittedAnswer: "3",
        isCorrect: true,
        solveTime: 20,
        submittedAt: [2025, 5, 11, 14, 0, 0, 0],
        problem: quizProblems[1]
    },
    {
        historyId: 3,
        userId: 1,
        problemId: 3,
        submittedAnswer: "2",
        isCorrect: true,
        solveTime: 40,
        submittedAt: [2025, 5, 1, 10, 0, 0, 0],
        problem: quizProblems[2]
    }
];
