//import { UserStreakData } from "../user/streak";

const API_URL = process.env.NEXT_PUBLIC_API_URL; // 환경변수 관리

export interface UserStreakFromServer {
    streak_id: number;
    activeDates: string[];   // 달성한 날짜 문자열 배열
    update_at: string;
    max_streak_count: number;
    min_streak_count: number;
    user: number;
}
// 스트릭 정보 가져오기
export async function fetchUserStreak(): Promise<UserStreakFromServer> {
    const response = await fetch(`${API_URL}/user/streak`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
        },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch user streak data");
    }

    const data = await response.json();
    return data as UserStreakFromServer;
}

// 스트릭 정보 서버에 저장
/*
export async function saveUserStreak(streak: UserStreakFromServer): Promise<void> {
    const response = await fetch(`${API_URL}/user/streak`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: JSON.stringify(streak),
    });

    if (!response.ok) {
        throw new Error("Failed to save user streak data");
    }
}
*/