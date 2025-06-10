import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { isTokenExpiringSoon, refreshAccessToken, removeLocalUserData, isTokenExpired, validateUserEmail } from "@/utils/apis/login";
import { getCookie } from "@/utils/auth/tokenUtils";

export const useTokenRefresh = () => {
    const router = useRouter();
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const lastValidationRef = useRef<number>(0); // 마지막 서버 검증 시간
    const isRefreshingRef = useRef<boolean>(false); // 토큰 갱신 중인지 여부

    useEffect(() => {
        const checkAndRefreshToken = async () => {
            if (typeof window === "undefined" || isRefreshingRef.current) return;

            const accessToken = getCookie("accessToken");
            const userEmail = getCookie("user_email");

            if (!accessToken || !userEmail) {
                console.log("No access token or user email found");
                return;
            }

            try {
                isRefreshingRef.current = true;

                // 1. 토큰이 만료되었는지 먼저 체크
                if (isTokenExpired(accessToken)) {
                    console.log("Token is expired, attempting refresh...");
                    const refreshResult = await refreshAccessToken();
                    if (!refreshResult) {
                        console.error("Failed to refresh expired token");
                        removeLocalUserData();
                        router.push("/login");
                        return;
                    }
                }

                // 2. 서버 검증 (5분마다만 실행)
                const now = Date.now();
                const fiveMinutes = 5 * 60 * 1000;

                if (now - lastValidationRef.current > fiveMinutes) {
                    try {
                        const { auth } = await validateUserEmail(accessToken, userEmail);
                        if (!auth) {
                            console.error("Token validation failed");
                            const refreshResult = await refreshAccessToken();
                            if (!refreshResult) {
                                removeLocalUserData();
                                router.push("/login");
                                return;
                            }
                        }
                        lastValidationRef.current = now;
                    } catch (error) {
                        console.error("Token validation error:", error);
                        const refreshResult = await refreshAccessToken();
                        if (!refreshResult) {
                            removeLocalUserData();
                            router.push("/login");
                            return;
                        }
                        lastValidationRef.current = now;
                    }
                }

                // 3. 토큰이 5분 내에 만료될 예정이면 미리 갱신
                if (isTokenExpiringSoon(accessToken, 5)) {
                    console.log("Token is expiring soon, attempting refresh...");
                    const refreshResult = await refreshAccessToken();
                    if (!refreshResult) {
                        removeLocalUserData();
                        router.push("/login");
                        return;
                    }
                }
            } finally {
                isRefreshingRef.current = false;
            }
        };

        // 초기 체크
        checkAndRefreshToken();

        // 1분마다 토큰 상태 체크
        intervalRef.current = setInterval(checkAndRefreshToken, 60 * 1000);

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [router]);
};
