// 쿠키 기반 토큰 관리 유틸리티
export const setCookie = (name: string, value: string, days: number = 7) => {
    const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
    document.cookie = `${name}=${value}; expires=${expires}; path=/; SameSite=Lax; httpOnly`;
};

export const getCookie = (name: string): string | null => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
        return parts.pop()?.split(";").shift() || null;
    }
    return null;
};

export const deleteCookie = (name: string) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

// 토큰을 쿠키에 저장
export const setTokenToCookie = (accessToken: string, refreshToken: string) => {
    setCookie("accessToken", accessToken, 1); // 1일 만료
    setCookie("refreshToken", refreshToken, 30); // 30일 만료
};

// 토큰을 쿠키에서 제거
export const clearTokenBoth = () => {
    deleteCookie("accessToken");
    deleteCookie("refreshToken");
};
