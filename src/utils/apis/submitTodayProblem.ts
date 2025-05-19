const apiUrl = process.env.NEXT_PUBLIC_API_URL;

interface SubmitResult {
    correct: boolean;
    score: number;
}

export const submitTodayProblem = async (
    problemId: number,
    answer: string,
    solveTime = 0
): Promise<SubmitResult> => {
    const response = await fetch(`${apiUrl}/submit/today`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({
            problemId,
            answer,
            solveTime,
        }),
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error("문제 제출 실패", errorText);
        throw new Error("문제 제출 실패");
    }

    return await response.json();
};
