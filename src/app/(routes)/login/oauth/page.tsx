"use client";

import React, { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Header from "@/app/_components/Header";
//import jwtDecode from "jwt-decode";
import { fetchAccessTokenFromGoogle, LoginResponseProps } from "@/utils/apis/login";

/*type Userinformation = {
    sub: string;
    new_user: boolean;
    exp: number;
};*/

const GoogleCallback = () => {
    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        const code = searchParams.get("code");

        if (code) {
            const fetchAccessToken = async () => {
                try {
                    const data: LoginResponseProps = await fetchAccessTokenFromGoogle(code);

                    if (data.access_token) {
                        if (typeof window === "undefined") return;

                        //const decoded = jwtDecode<Userinformation>(data.access_token);

                        localStorage.setItem("access_token", data.access_token);
                        localStorage.setItem("refresh_token", data.refresh_token);
                        localStorage.setItem("user_email", data.user_email); //localStorage.setItem("user_email", decoded.sub);
                        //localStorage.setItem("new_user", JSON.stringify(decoded.new_user));
                        //localStorage.setItem("token_exp", decoded.exp.toString());

                        router.push("/");

                    } else {
                        console.error("Login Failed: No Access Token.");
                        alert("로그인에 실패했습니다.");
                        router.push("/login");
                    }
                } catch (error) {
                    console.error("Login Failed: ", error);
                    alert("로그인 중 오류가 발생했습니다.\n잠시 후 다시 시도해주세요.");
                    router.push("/login");
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
