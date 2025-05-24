const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const fetchTotalProblemNumber = async () => {
    const response = await fetch(`${apiUrl}/problem/stats`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error(`[Problem Fetch Error] ${response.status}: ${errorText}`);
        throw new Error("전체 문제 정보를 가져오는데 실패했습니다.");
    }

    return await response.json();
}