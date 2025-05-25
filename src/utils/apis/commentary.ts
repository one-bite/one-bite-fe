import { ProblemDescription } from "@/app/_configs/types/quiz";

export const fetchCommentary = async (
    problemId: number,
    description: ProblemDescription
): Promise<string> => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const response = await fetch(`${apiUrl}/problem/commentary`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            //Authorization : `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({
            problemId,
            description,
        }),
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error("AI 해설 요청 실패", errorText);
        throw new Error("AI 해설 요청 실패");
    }
    return  await response.json();
}