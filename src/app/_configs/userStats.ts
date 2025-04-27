const USER_STATS_KEY = "userStats";

export interface UserStatsData {
    streak: number;
    point: number;
    rank: number;
}

const defaultStats: UserStatsData = {
    streak: 0,
    point: 0,
    rank: 0,
}

export function getUserStats(): UserStatsData {
    if (typeof window === "undefined") {
        return defaultStats;
    }

    const data = localStorage.getItem(USER_STATS_KEY);

    if (data) {
        try {
            return JSON.parse(data) as UserStatsData;
        } catch (e) {
            console.error("유저 스탯 불러오기 실패", e);
            return defaultStats
        }
    }

    return defaultStats;
}

export function setUserStats(newStats: Partial<UserStatsData>): void {
    if (typeof window === "undefined") return;

    const currentStats = getUserStats();
    const updatedStats = { ...currentStats, ...newStats };
    localStorage.setItem(USER_STATS_KEY, JSON.stringify(updatedStats));
}

export function getStreak(): number {
    return getUserStats().streak;
}

export function setStreak(newStreak: number): void {
    setUserStats({ streak: newStreak });
}

export function getPoint(): number {
    return getUserStats().point;
}

export function setPoint(newPoint: number): void {
    setUserStats({ point: newPoint });
}

export function getRank(): number {
    return getUserStats().rank;
}

export function setRank(newRank: number): void {
    setUserStats({ rank: newRank });
}