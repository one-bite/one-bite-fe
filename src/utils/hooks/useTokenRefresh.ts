import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { isTokenExpiringSoon, refreshAccessToken, removeLocalUserData, isTokenExpired, validateUserEmail } from "@/utils/apis/login";
import { getCookie } from "@/utils/auth/tokenUtils";

export const useTokenRefresh = () => {
    const router = useRouter();
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const lastValidationRef = useRef<number>(0);
    const isRefreshingRef = useRef<boolean>(false);

    useEffect(() => {
        const checkAndRefreshToken = async () => {
            if (typeof window === "undefined" || isRefreshingRef.current) return;

            const accessToken = getCookie("accessToken");
            const userEmail = getCookie("user_email");

            console.log("[Token Debug] 현재 토큰 상태:", {
                hasAccessToken: !!accessToken,
                hasUserEmail: !!userEmail,
                isRefreshing: isRefreshingRef.current,
            });

            if (!accessToken || !userEmail) {
                console.warn("[Token Debug] 토큰 또는 이메일 없음");
                return;
            }

            try {
                isRefreshingRef.current = true;

                // 토큰 만료 체크
                const isExpired = isTokenExpired(accessToken);
                console.log("[Token Debug] 토큰 만료 체크:", { isExpired });

                if (isExpired) {
                    console.log("[Token Debug] 토큰 만료됨, 갱신 시도");
                    const refreshResult = await refreshAccessToken();
                    console.log("[Token Debug] 토큰 갱신 결과:", { success: refreshResult });

                    if (!refreshResult) {
                        console.error("[Token Debug] 토큰 갱신 실패");
                        removeLocalUserData();
                        router.push("/login");
                        return;
                    }
                }

                const now = Date.now();
                const fiveMinutes = 5 * 60 * 1000;
                const shouldValidate = now - lastValidationRef.current > fiveMinutes;

                console.log("[Token Debug] 토큰 검증 필요:", {
                    shouldValidate,
                    timeSinceLastValidation: now - lastValidationRef.current,
                });

                if (shouldValidate) {
                    try {
                        console.log("[Token Debug] 토큰 검증 시작");
                        const { auth } = await validateUserEmail(accessToken, userEmail);
                        console.log("[Token Debug] 토큰 검증 결과:", { auth });

                        if (!auth) {
                            console.error("[Token Debug] 토큰 검증 실패, 갱신 시도");
                            const refreshResult = await refreshAccessToken();
                            console.log("[Token Debug] 검증 실패 후 갱신 결과:", { success: refreshResult });

                            if (!refreshResult) {
                                console.error("[Token Debug] 검증 실패 후 갱신 실패");
                                removeLocalUserData();
                                router.push("/login");
                                return;
                            }
                        }
                        lastValidationRef.current = now;
                    } catch (error) {
                        console.error("[Token Debug] 토큰 검증 중 에러:", error);
                        const refreshResult = await refreshAccessToken();
                        console.log("[Token Debug] 검증 에러 후 갱신 결과:", { success: refreshResult });

                        if (!refreshResult) {
                            console.error("[Token Debug] 검증 에러 후 갱신 실패");
                            removeLocalUserData();
                            router.push("/login");
                            return;
                        }
                        lastValidationRef.current = now;
                    }
                }

                const isExpiringSoon = isTokenExpiringSoon(accessToken, 5);
                console.log("[Token Debug] 토큰 만료 임박 체크:", { isExpiringSoon });

                if (isExpiringSoon) {
                    console.log("[Token Debug] 토큰 만료 임박, 갱신 시도");
                    const refreshResult = await refreshAccessToken();
                    console.log("[Token Debug] 만료 임박 갱신 결과:", { success: refreshResult });

                    if (!refreshResult) {
                        console.error("[Token Debug] 만료 임박 갱신 실패");
                        removeLocalUserData();
                        router.push("/login");
                        return;
                    }
                }
            } catch (error) {
                console.error("[Token Debug] 토큰 갱신 프로세스 중 예기치 않은 에러:", error);
            } finally {
                isRefreshingRef.current = false;
            }
        };

        console.log("[Token Debug] 토큰 갱신 프로세스 시작");
        checkAndRefreshToken();
        intervalRef.current = setInterval(checkAndRefreshToken, 60 * 1000);

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [router]);
};
