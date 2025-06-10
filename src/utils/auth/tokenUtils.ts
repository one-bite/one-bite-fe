// 쿠키 기반 토큰 관리 유틸리티
export const setCookie = (name: string, value: string, days: number = 7) => {
    console.log(`[Cookie Debug] 쿠키 설정 시도: ${name}=${value.substring(0, 20)}...`);

    const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
    const cookieString = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;

    document.cookie = cookieString;

    // 설정 후 검증
    const verification = getCookie(name);
    console.log(`[Cookie Debug] 쿠키 설정 검증: ${name}=${verification ? "성공" : "실패"}`);
};

export const getCookie = (name: string): string | null => {
    try {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) {
            const cookieValue = parts.pop()?.split(";").shift();
            if (cookieValue) {
                const decodedValue = decodeURIComponent(cookieValue);
                console.log(`[Cookie Debug] 쿠키 읽기 성공: ${name}=${decodedValue.substring(0, 20)}...`);
                return decodedValue;
            }
        }
        console.log(`[Cookie Debug] 쿠키 읽기 실패: ${name} not found`);
        return null;
    } catch (error) {
        console.error(`[Cookie Debug] 쿠키 읽기 에러: ${name}`, error);
        return null;
    }
};

export const deleteCookie = (name: string) => {
    console.log(`[Cookie Debug] 쿠키 삭제 시도: ${name}`);

    // 여러 경로로 삭제 시도
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Lax`;
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;

    // 삭제 후 검증
    const verification = getCookie(name);
    console.log(`[Cookie Debug] 쿠키 삭제 검증: ${name}=${verification ? "실패" : "성공"}`);
};

// 토큰을 쿠키에 저장
export const setTokenToCookie = (accessToken: string, refreshToken: string) => {
    console.log(`[Cookie Debug] 토큰 저장 시작`);
    setCookie("accessToken", accessToken, 1); // 1일 만료
    setCookie("refreshToken", refreshToken, 30); // 30일 만료

    // 추가 정보도 함께 저장
    setCookie("user_email", accessToken.includes(".") ? JSON.parse(atob(accessToken.split(".")[1])).sub : "", 1);

    console.log(`[Cookie Debug] 토큰 저장 완료`);
};

// 토큰을 쿠키에서 제거
export const clearTokenBoth = () => {
    console.log(`[Cookie Debug] 모든 토큰 삭제 시작`);
    deleteCookie("accessToken");
    deleteCookie("refreshToken");
    deleteCookie("user_email");
    deleteCookie("token_exp");
    deleteCookie("lastActivity");
    deleteCookie("new_user");
    deleteCookie("user_roles");
    console.log(`[Cookie Debug] 모든 토큰 삭제 완료`);
};
