export const submitProblem = async (problemId, body, token) => {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/problem/${problemId}/submit`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(body),
        }
    );

    if (!response.ok) {
        throw new Error("문제 제출에 실패했습니다.");
    }

    return await response.json();
};
