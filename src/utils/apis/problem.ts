import {QuizProblem} from "app/_configs/types/quiz";

export const fetchProblems = async () : Promise<QuizProblem[]> => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const response = await fetch(`${apiUrl}/db/problems`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error("문제 불러오기 실패");
    }

    return await response.json(); // 문제 리스트 반환
};