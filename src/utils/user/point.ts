import { setCookie, getCookie, deleteCookie } from "../auth/tokenUtils";

const POINT_KEY = "userPoint";

export interface UserPointData {
    point: number;
}

const defaultPoint: UserPointData = {
    point: 0,
};

export function initPoint(): void {
    if (typeof window === "undefined") return;

    const data = getCookie(POINT_KEY);

    if (!data) {
        setCookie(POINT_KEY, JSON.stringify(defaultPoint), 1);
    }
}

// 가져오기
export function getPoint(): number {
    if (typeof window === "undefined") return defaultPoint.point;

    const data = getCookie(POINT_KEY);
    if (data) {
        try {
            return JSON.parse(data).point as number;
        } catch (e) {
            console.error("Failed to parse userPoint:", e);
            return defaultPoint.point;
        }
    }
    return defaultPoint.point;
}

// 저장하기
export function setPoint(newPoint: number): void {
    if (typeof window === "undefined") return;
    setCookie(POINT_KEY, JSON.stringify({ point: newPoint }), 1);

    window.dispatchEvent(new Event("userStatsUpdated")); // 다른 탭에서도 업데이트 반영
}

// 포인트 추가
export function addPoint(amount: number): void {
    const current = getPoint();
    setPoint(current + amount);
}

// 포인트 차감
export function deductPoint(amount: number): void {
    const current = getPoint();
    setPoint(Math.max(0, current - amount)); // 0 이하로 안 내려가게
}
