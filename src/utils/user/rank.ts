const RANK_KEY = "userRank";

export interface UserRankData {
    rank: number;
}

const defaultRank: UserRankData = {
    rank: 0,
};

// 가져오기
export function getRank(): number {
    if (typeof window === "undefined") return defaultRank.rank;

    const data = localStorage.getItem(RANK_KEY);
    if (data) {
        try {
            return JSON.parse(data).rank as number;
        } catch (e) {
            console.error("Failed to parse userRank:", e);
            return defaultRank.rank;
        }
    }
    return defaultRank.rank;
}

// 저장하기
export function setRank(newRank: number): void {
    if (typeof window === "undefined") return;
    localStorage.setItem(RANK_KEY, JSON.stringify({ rank: newRank }));
}

// 랭크를 올리기
export function increaseRank(): void {
    const current = getRank();
    setRank(current + 1);
}

// 랭크를 내리기
export function decreaseRank(): void {
    const current = getRank();
    setRank(Math.max(0, current - 1)); // 0 이하로 안 내려가게
}
