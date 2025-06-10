import { apiRequestWithTokenRefresh } from "./login";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface UserStreakFromServer {
    maxStreak: number; // 최대 스트릭 수
    nowStreak: number; // 현재 스트릭 수
    streakHistory: string[]; // 달성한 날짜 문자열 배열
}
// 스트릭 정보 가져오기
export async function fetchUserStreak(): Promise<UserStreakFromServer> {
    const response = await apiRequestWithTokenRefresh(`${API_URL}/users/streak`, {
        method: "GET",
    });

    if (!response.ok) {
        throw new Error("Failed to fetch user streak data");
    }

    const data = await response.json();
    return data as UserStreakFromServer;
}
