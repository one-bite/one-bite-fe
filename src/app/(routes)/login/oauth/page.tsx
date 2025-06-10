"use client";

import React, { Suspense, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { fetchAccessTokenFromGoogle, LoginResponseProps } from "@/utils/apis/login";
import { syncUserStreak } from "@/utils/user/streak"; // 스트릭 동기화 함수
import { setTokenToCookie, setCookie } from "@/utils/auth/tokenUtils";

type Userinformation = {
    sub: string;
    new_user: boolean;
    roles?: string[];
    exp: number;
    iat: number;
};

const GoogleCallback = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const isSentRef = useRef(false);

    useEffect(() => {
        if (isSentRef.current) return;
        isSentRef.current = true;

        const code = searchParams.get("code");

        if (code) {
            const fetchAccessToken = async () => {
                try {
                    console.log("[OAuth Debug] 액세스 토큰 요청 시작");
                    const data: LoginResponseProps = await fetchAccessTokenFromGoogle(code);

                    if (data.accessToken) {
                        if (typeof window === "undefined") return;

                        console.log("[OAuth Debug] 토큰 수신 성공");
                        const decoded = jwtDecode<Userinformation>(data.accessToken);

                        // 토큰을 쿠키에 저장 (user_email도 자동으로 설정됨)
                        setTokenToCookie(data.accessToken, data.refreshToken);

                        // 추가 정보 저장
                        setCookie("new_user", JSON.stringify(decoded.new_user), 1);
                        setCookie("token_exp", decoded.exp.toString(), 1);
                        setCookie("lastActivity", Date.now().toString(), 1);

                        // 사용자 권한 정보 저장 (있는 경우)
                        if (decoded.roles) {
                            setCookie("user_roles", JSON.stringify(decoded.roles), 1);
                        }

                        console.log("[OAuth Debug] 모든 쿠키 설정 완료");

                        //유저 스탯 표시 상태 동기화
                        window.dispatchEvent(new Event("loginSuccess"));

                        //유저 스트릭 동기화
                        console.log("[OAuth Debug] 스트릭 동기화 시작");
                        syncUserStreak();

                        console.log("[OAuth Debug] 메인 페이지로 이동");
                        router.replace("/");
                    } else {
                        console.error("Login Failed: No Access Token.");
                        alert("로그인에 실패했습니다.");
                        router.replace("/login");
                    }
                } catch (error) {
                    console.error("Login Failed: ", error);
                    alert("로그인 중 오류가 발생했습니다.\n잠시 후 다시 시도해주세요.");
                    router.replace("/login");
                }
            };

            fetchAccessToken();
        }
    }, [searchParams, router]);

    return <></>;
};

export default function SuspenseWrapper() {
    return (
        <Suspense fallback={<div>Callback ...</div>}>
            <GoogleCallback />
        </Suspense>
    );
}
