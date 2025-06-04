const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export interface userRankData {
    name: string;
    point: number;
}

export async function fetchRank(): Promise<userRankData> {
    const response = await fetch(`${apiUrl}/users/rank`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
    });

    if(!response.ok) {
        throw new Error("Failed to fetch user rank data");
    }

    const data = await response.json();
    return data as userRankData;
}