const STREAK_KEY = "userStreak";

export interface UserStreakData {
    totalStreak: number;       // 현재 총 스트릭 수
    todayQuizLeft: number;      // 오늘 남은 문제 수
    todayStreakAchieved: boolean; // 오늘 스트릭 달성 여부
    streakHistory: string[];    // 스트릭 달성한 날짜 리스트 (ex: ["2025-04-14", "2025-04-15"])
}

// 기본 초기값
const defaultStreak: UserStreakData = {
    totalStreak: 0,
    todayQuizLeft: 10,
    todayStreakAchieved: false,
    streakHistory: [],
};

// get
export function getStreak(): UserStreakData {
    if (typeof window === "undefined") return defaultStreak;

    const data = localStorage.getItem(STREAK_KEY);
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
    localStorage.setItem(STREAK_KEY, JSON.stringify(updated));
}

// 문제를 하나 풀었을 때 호출
export function decreaseTodayQuizLeft(): void {
    const streakData = getStreak();
    const updatedQuizLeft = Math.max(0, streakData.todayQuizLeft - 1);

    if (updatedQuizLeft === 0 && !streakData.todayStreakAchieved) {
        // 오늘 스트릭 달성!
        const today = new Date().toISOString().split("T")[0]; // "2025-04-27" 형식

        setStreak({
            totalStreak: streakData.totalStreak + 1,
            todayQuizLeft: 0,
            todayStreakAchieved: true,
            streakHistory: [...streakData.streakHistory, today],
        });
    } else {
        setStreak({
            todayQuizLeft: updatedQuizLeft,
        });
    }
}

// 하루가 지나면 초기화 (내일로 넘어갈 때 호출)
export function resetTodayStreak(): void {
    setStreak({
        todayQuizLeft: 10, // 목표 문제 수로 초기화
        todayStreakAchieved: false,
    });
}
