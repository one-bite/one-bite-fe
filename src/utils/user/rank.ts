import { userRankData, fetchRank } from "../apis/rankApi";
import { setCookie, getCookie } from "../auth/tokenUtils";

const RANK_KEY = "userRank";

const defaultRank: userRankData = {
    name: "Unranked",
    point: 0,
};

const rankTextColorMap: Record<string, string> = {
    Unranked: "text-lime-500",
    Iron: "text-gray-500",
    Bronze: "text-amber-700",
    Silver: "text-gray-300",
    Gold: "text-yellow-500",
    Platinum: "text-teal-400",
    Diamond: "text-cyan-400",
};

const rankBadgeColorMap: Record<string, string> = {
    Unranked: "bg-lime-500",
    Iron: "bg-gray-500",
    Bronze: "bg-amber-700",
    Silver: "bg-gray-300",
    Gold: "bg-yellow-500",
    Platinum: "bg-teal-400",
    Diamond: "bg-cyan-400",
};

function getRankBaseName(rank: string): string {
    return rank.split(" ")[0];
}

export function getRankColor(name: string): { textColor: string; badgeColor: string } {
    const base = getRankBaseName(name);
    return {
        textColor: rankTextColorMap[base] || "text-gray-800",
        badgeColor: rankBadgeColorMap[base] || "bg-gray-800",
    };
}

export function initRank(): void {
    if (typeof window === "undefined") return;

    const data = getCookie(RANK_KEY);

    if (!data) {
        setCookie(RANK_KEY, JSON.stringify(defaultRank), 1);
    }
}

// 가져오기
export function getRank(): userRankData {
    if (typeof window === "undefined") return defaultRank;

    const data = getCookie(RANK_KEY);
    if (data) {
        try {
            return JSON.parse(data) as userRankData;
        } catch (e) {
            console.error("Failed to parse userRank:", e);
            return defaultRank;
        }
    }
    return defaultRank;
}

// 저장하기
export function setRank(newRank: userRankData): void {
    if (typeof window === "undefined") return;
    setCookie(RANK_KEY, JSON.stringify(newRank), 1);

    window.dispatchEvent(new Event("userStatsUpdated")); // 다른 탭에서도 업데이트 반영
}

export async function syncUserRank() {
    try {
        const serverData = await fetchRank();

        setRank({
            name: serverData.name,
            point: serverData.point,
        });
    } catch (e) {
        console.error("유저 랭크 동기 실패:", e);
    }
}
