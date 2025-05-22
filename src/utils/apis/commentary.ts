export async function fetchCommentary(description: string): Promise<string> {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const response = await fetch(`${apiUrl}/commentary`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({description}),
    });
    if (!response.ok) {
        throw new Error("AI 해설 요청 실패");
    }
    return  await response.json();
}