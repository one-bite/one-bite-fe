import { fetchUserStreak } from "@/utils/apis/streakApi";
import { fetchTodayProblems } from "../apis/todayProblem";
import { setCookie, getCookie } from "../auth/tokenUtils";

const STREAK_KEY = "userStreak";

export interface UserStreakData {
    maxStreak: number; // 최대 스트릭 수
    nowStreak: number; // 현재 스트릭 수
    todayStreakQuizLeft: number; // 오늘 남은 문제 수
    streakHistory: string[]; // 스트릭 달성한 날짜 리스트 (ex: ["2025-04-14", "2025-04-15"])
}

// 기본 초기값
const defaultStreak: UserStreakData = {
    maxStreak: 0,
    nowStreak: 0,
    todayStreakQuizLeft: 0,
    streakHistory: [],
};

export function initStreak(): void {
    if (typeof window === "undefined") return;

    const data = getCookie(STREAK_KEY);

    if (!data) {
        setCookie(STREAK_KEY, JSON.stringify(defaultStreak), 1);
    }
}

// get
export function getStreak(): UserStreakData {
    if (typeof window === "undefined") return defaultStreak;

    const data = getCookie(STREAK_KEY);
    if (data) {
        try {
            return JSON.parse(data) as UserStreakData;
        } catch (e) {
            console.error("Failed to parse userStreak:", e);
            return defaultStreak;
        }
    }
    return defaultStreak;
}

// set
export function setStreak(newStreak: Partial<UserStreakData>): void {
    if (typeof window === "undefined") return;

    const current = getStreak();
    const updated = { ...current, ...newStreak };

    setCookie(STREAK_KEY, JSON.stringify(updated), 1);
    window.dispatchEvent(new Event("userStatsUpdated")); // 다른 탭에서도 업데이트 반영
}

// 문제를 하나 풀었을 때 호출
export function decreaseTodayQuizLeft(): void {
    const streakData = getStreak();

    if (streakData.todayStreakQuizLeft === 0) {
        return; //이미 스트릭이 달성됨
    }

    const updatedQuizLeft = Math.max(0, streakData.todayStreakQuizLeft - 1);

    if (updatedQuizLeft === 0) {
        // 오늘 스트릭 달성
        const today = new Date().toISOString().split("T")[0]; // "2025-04-27" 형식

        if (streakData.maxStreak <= streakData.nowStreak) {
            setStreak({
                maxStreak: streakData.nowStreak + 1,
                nowStreak: streakData.nowStreak + 1,
                todayStreakQuizLeft: 0,
                streakHistory: [...streakData.streakHistory, today],
            });
        }

        setStreak({
            nowStreak: streakData.nowStreak + 1,
            todayStreakQuizLeft: 0,
            streakHistory: [...streakData.streakHistory, today],
        });
    } else {
        setStreak({
            todayStreakQuizLeft: updatedQuizLeft,
        });
    }
}

export async function syncUserStreak() {
    try {
        const serverData = await fetchUserStreak();

        let remaining = 0;
        try {
            const todayData = await fetchTodayProblems();

            if (todayData?.problemStatus) {
                remaining = todayData.problemStatus.filter((v: boolean) => !v).length;
            } else {
                console.warn("오늘의 문제 없음. todayRemaining = 0 처리");
            }
        } catch (e) {
            console.error(e, "오늘의 문제 요청 실패");
        }

        setStreak({
            maxStreak: serverData.maxStreak,
            nowStreak: serverData.nowStreak,
            todayStreakQuizLeft: remaining,
            streakHistory: serverData.streakHistory,
        });
    } catch (e) {
        console.error("유저 스트릭 동기 실패:", e);
    }
}
