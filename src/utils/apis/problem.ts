import { QuizProblem } from "@/app/_configs/types/quiz";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const fetchProblem = async (problemId: number): Promise<QuizProblem> => {

    const response = await fetch(`${apiUrl}/db/problems/${problemId}`, {
        method: "GET",
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error(`[Problem Fetch Error] ${response.status}: ${errorText}`);
        throw new Error("문제 정보를 가져오는데 실패했습니다.");
    }

    return await response.json();
};