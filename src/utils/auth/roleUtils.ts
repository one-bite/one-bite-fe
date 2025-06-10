import { getCookie } from "./tokenUtils";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
    sub: string;
    new_user: boolean;
    roles?: string[];
    exp: number;
    iat: number;
}

// 사용자 권한 확인 함수
export const hasRole = (requiredRole: string): boolean => {
    try {
        const token = getCookie("accessToken");
        if (!token) return false;

        const decoded = jwtDecode<DecodedToken>(token);
        return decoded.roles?.includes(requiredRole) || false;
    } catch {
        return false;
    }
};

// 사용자 권한 목록 가져오기
export const getUserRoles = (): string[] => {
    try {
        const token = getCookie("accessToken");
        if (!token) return [];

        const decoded = jwtDecode<DecodedToken>(token);
        return decoded.roles || [];
    } catch {
        return [];
    }
};

// 관리자 권한 확인
export const isAdmin = (): boolean => {
    return hasRole("ROLE_ADMIN");
};

// 게스트 사용자인지 확인
export const isGuest = (): boolean => {
    return hasRole("ROLE_GUEST");
};
