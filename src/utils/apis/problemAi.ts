import { AiProblemRequest, AiProblemResponse } from "@/app/_configs/types/quiz";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const generateAiProblem = async (
    payload: AiProblemRequest
) : Promise<AiProblemResponse> => {
        const response = await fetch(`${apiUrl}/ai/problem`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                //"Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errortext = await response.text();
            console.error("문제 생성 실패", errortext);
            throw new Error("AI 문제 생성 요청 실패");
        }
        
        return await response.json();
};
