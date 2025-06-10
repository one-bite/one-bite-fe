import { clearUserEmail, setUserEmail } from "../user/userEmail";
import { jwtDecode } from "jwt-decode";
import { setTokenToCookie, clearTokenBoth, getCookie, deleteCookie, setCookie } from "../auth/tokenUtils";

export interface LoginResponseProps {
    accessToken: string;
    refreshToken: string;
    user_email: string;
}

interface DecodedToken {
    sub: string;
    new_user: boolean;
    roles?: string[];
    exp: number;
    iat: number;
}

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// 토큰 만료 체크 함수
export const isTokenExpired = (token: string): boolean => {
    try {
        const decoded = jwtDecode<DecodedToken>(token);
        const currentTime = Math.floor(Date.now() / 1000);
        return decoded.exp < currentTime;
    } catch {
        return true;
    }
};

// 토큰 만료 5분 전 체크 함수
export const isTokenExpiringSoon = (token: string, minutesBefore: number = 5): boolean => {
    try {
        const decoded = jwtDecode<DecodedToken>(token);
        const currentTime = Math.floor(Date.now() / 1000);
        const timeUntilExpiry = decoded.exp - currentTime;
        return timeUntilExpiry < minutesBefore * 60;
    } catch {
        return true;
    }
};

// 토큰 갱신 함수
export const refreshAccessToken = async (): Promise<LoginResponseProps | null> => {
    try {
        const refreshToken = getCookie("refreshToken");
        if (!refreshToken) {
            throw new Error("Refresh token is missing.");
        }

        const response = await fetch(`${apiUrl}/oauth/refresh?token=${refreshToken}`, {
            method: "GET",
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Token refresh failed: ", errorData);
            throw new Error("토큰 갱신에 실패했습니다.");
        }

        const data: LoginResponseProps = await response.json();

        // 새로운 토큰들을 쿠키에 저장
        setTokenToCookie(data.accessToken, data.refreshToken);

        // JWT 디코딩하여 사용자 정보 업데이트
        const decoded = jwtDecode<DecodedToken>(data.accessToken);
        setUserEmail(decoded.sub);
        setCookie("token_exp", decoded.exp.toString(), 1);
        setCookie("lastActivity", Date.now().toString(), 1);

        return data;
    } catch (error) {
        console.error("Token refresh failed: ", error);
        removeLocalUserData();
        return null;
    }
};

// 자동 토큰 갱신을 포함한 API 요청 래퍼
export const apiRequestWithTokenRefresh = async (url: string, options: RequestInit = {}): Promise<Response> => {
    const accessToken = getCookie("accessToken");

    if (!accessToken) {
        throw new Error("No access token available");
    }

    // 토큰이 만료되었거나 곧 만료될 예정이면 갱신 시도
    if (isTokenExpired(accessToken) || isTokenExpiringSoon(accessToken)) {
        const refreshResult = await refreshAccessToken();
        if (!refreshResult) {
            throw new Error("Failed to refresh token");
        }
    }

    // 갱신된 토큰으로 API 요청
    const updatedToken = getCookie("accessToken");
    const response = await fetch(url, {
        ...options,
        headers: {
            ...options.headers,
            Authorization: `Bearer ${updatedToken}`,
        },
    });

    return response;
};

export const fetchAccessTokenFromGoogle = async (code: string): Promise<LoginResponseProps> => {
    try {
        if (!code) {
            throw new Error("Authorization code is missing.");
        }

        const response = await fetch(`${apiUrl}/oauth/google?token=${code}`, {
            method: "GET",
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Login Failed: ", errorData);
            throw new Error("로그인 처리 중 오류가 발생했습니다.-1");
        }

        const data: LoginResponseProps = await response.json();
        return data;
    } catch (error) {
        console.error("Login Failed: ", error);
        throw new Error("로그인 처리 중 오류가 발생했습니다.-2");
    }
};

export const fetchLogoutFromGoogle = async () => {
    try {
        const accessToken = getCookie("accessToken");
        if (!accessToken) {
            throw new Error("Access token is missing.");
        }

        // 토큰 자동 갱신을 포함한 API 요청
        const response = await apiRequestWithTokenRefresh(`${apiUrl}/oauth/logout`, {
            method: "GET",
        });
        if (!response.ok) {
            const errorData = await response.json();
            console.error("API Fetch Failed: ", errorData);
            throw new Error("API 요청에 실패했습니다.");
        }
    } catch (error) {
        console.error("Logout Failed: ", error);
        throw new Error("로그아웃 처리 중 오류가 발생했습니다.");
    }
};

export const validateUserEmail = async (accessToken: string, user_email: string): Promise<{ res: string; auth: boolean }> => {
    try {
        if (!accessToken || !user_email) {
            throw new Error("Access token or user email is missing.");
        }

        // JWT 토큰 검증
        const decoded = jwtDecode<DecodedToken>(accessToken);
        const currentTime = Math.floor(Date.now() / 1000);

        // 토큰이 만료되었는지 확인
        if (decoded.exp < currentTime) {
            throw new Error("Token has expired");
        }

        // 이메일이 일치하는지 확인
        if (decoded.sub !== user_email) {
            throw new Error("Email mismatch");
        }

        return { res: "Token is valid", auth: true };
    } catch (error) {
        console.error("Validation Failed: ", error);
        throw new Error("유효성 검사 중 오류가 발생했습니다.");
    }
};

export const removeLocalUserData = (): void => {
    if (typeof window === "undefined") return;
    clearUserEmail();
    clearTokenBoth();
    deleteCookie("user_email");
    deleteCookie("token_exp");
    deleteCookie("lastActivity");
};
