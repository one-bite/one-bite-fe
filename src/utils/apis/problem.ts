import {TodayQuizResponse} from "app/_configs/types/quiz";

export const fetchTodayProblems = async () : Promise<TodayQuizResponse> => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const response = await fetch(`${apiUrl}/users/today`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
        },
    });

    if (!response.ok) {
        throw new Error("문제 불러오기 실패");
    }

    return await response.json(); // 문제 리스트 반환
};