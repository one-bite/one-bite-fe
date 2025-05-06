"use client";

import React, { Suspense, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { fetchAccessTokenFromGoogle, LoginResponseProps } from "@/utils/apis/login";
import { syncUserStreak } from "@/utils/user/streak"; // 스트릭 동기화 함수

type Userinformation = {
    sub: string;
    new_user: boolean;
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
                    const data: LoginResponseProps = await fetchAccessTokenFromGoogle(code);

                    //const data = mockLoggedInUser;

                    if (data.accessToken) {
                        if (typeof window === "undefined") return;

                        const decoded = jwtDecode<Userinformation>(data.accessToken);

                        localStorage.setItem("accessToken", data.accessToken);
                        localStorage.setItem("refreshToken", data.refreshToken);
                        localStorage.setItem("user_email", decoded.sub);
                        localStorage.setItem("new_user", JSON.stringify(decoded.new_user));
                        localStorage.setItem("token_exp", decoded.exp.toString());

                        //유저 스트릭 동기화
                        syncUserStreak();


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
