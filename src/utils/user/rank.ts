const RANK_KEY = "userRank";

export interface UserRankData {
    score: number; // 현재 레이팅 포인트
    rank: string;
}

const defaultRank: UserRankData = {
    score: 0,
    rank: "Iron", // 랭크 초기화
};

export function initRank(): void {
    if (typeof window === "undefined") return;

    const data = localStorage.getItem(RANK_KEY);

    if (!data) {
        localStorage.setItem(RANK_KEY, JSON.stringify(defaultRank));
    }
}

const rankTable = [
    {rank: "Iron", minpoint: 0},
    {rank: "Bronze", minpoint: 200},
    {rank: "Silver", minpoint: 400},
    {rank: "Gold", minpoint: 800},
    {rank: "Platinum", minpoint: 1600},
    {rank: "Diamond", minpoint: 3200},
    
];

// 가져오기
export function getRank(): UserRankData {
    if (typeof window === "undefined") return defaultRank;

    const data = localStorage.getItem(RANK_KEY);
    if (data) {
        try {
            return JSON.parse(data) as UserRankData;
        } catch (e) {
            console.error("Failed to parse userRank:", e);
            return defaultRank;
        }
    }
    return defaultRank;
}

// 저장하기
export function setRank(newRank: UserRankData): void {
    if (typeof window === "undefined") return;
    localStorage.setItem(RANK_KEY, JSON.stringify(newRank));

    window.dispatchEvent(new Event("userStatsUpdated")); // 다른 탭에서도 업데이트 반영
}

function calculateRank(score: number): string {
    let currentRank = rankTable[0].rank;
    for (const rankInfo of rankTable) {
        if (score >= rankInfo.minpoint) {
            currentRank = rankInfo.rank;
        } else {
            break;
        }
    }
    return currentRank;
}

export function addScore(amount: number = 1): void {
    const current = getRank();
    const newScore = current.score + amount;
    const newRank = calculateRank(newScore);

    setRank({
        score: newScore,
        rank: newRank
    });
}

// 점수 감소
export function subtractScore(amount: number = 1): void {
    const current = getRank();
    const newScore = Math.max(0, current.score - amount);
    const newRank = calculateRank(newScore);

    setRank({
        score: newScore,
        rank: newRank,
    });
}