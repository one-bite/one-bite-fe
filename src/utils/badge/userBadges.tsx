export type BadgeLevel = "Iron" | "Bronze" | "Silver" | "Gold" | "Platinum" | "Diamond";

export interface UserStats {
    correct: number;
    total: number;
    streakDays: number;
    todayAccuracy: number;
    topicCorrect: number;
    allTopicsCorrect: number;
    challengeStreak: number;
}

const BADGE_STORAGE_KEY = "userBadges";

// 판단 함수
export function checkUserBadges(stats: UserStats): Record<string, BadgeLevel> {
    const result: Record<string, BadgeLevel> = {};

    const levelCheck = (value: number, thresholds: number[]): BadgeLevel | null => {
        const levels: BadgeLevel[] = ["Iron", "Bronze", "Silver", "Gold", "Platinum", "Diamond"];
        for (let i = thresholds.length - 1; i >= 0; i--) {
            if (value >= thresholds[i]) return levels[i];
        }
        return null;
    };

    result["1"] = levelCheck(stats.correct, [1, 10, 25, 50, 100, 200]) ?? undefined!;
    result["2"] = levelCheck(stats.total, [10, 30, 50, 100, 200, 400]) ?? undefined!;
    result["3"] = levelCheck(stats.streakDays, [1, 3, 7, 14, 30, 90]) ?? undefined!;
    result["4"] = levelCheck(stats.todayAccuracy, [20, 40, 60, 80, 90, 100]) ?? undefined!;
    result["5"] = levelCheck(stats.topicCorrect, [10, 20, 40, 70, 100, 150]) ?? undefined!;
    result["6"] = levelCheck(stats.allTopicsCorrect, [5, 10, 20, 40, 70, 100]) ?? undefined!;
    result["7"] = levelCheck(stats.challengeStreak, [5, 10, 15, 20, 25, 30]) ?? undefined!;

    return result;
}

// 저장
export function storeUserBadges(stats: UserStats): void {
    const data = checkUserBadges(stats);
    if (typeof window !== "undefined") {
        localStorage.setItem(BADGE_STORAGE_KEY, JSON.stringify(data));
    }
}

// 불러오기
export function loadUserBadges(): Record<string, BadgeLevel> {
    if (typeof window === "undefined") return {};
    const raw = localStorage.getItem(BADGE_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
}