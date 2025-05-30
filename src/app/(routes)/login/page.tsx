"use client";

import { Logo } from "@/app/_components/icon/LogoIcon";
import GoogleLoginButton from "@/app/_components/login/GoogleLoginButton";
import LoginCard from "@/app/_components/card/LoginCard";
import React from "react";

const Login = () => {
    const redirectUri = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/login/oauth`;
    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&redirect_uri=${redirectUri}&response_type=code&scope=openid email profile&access_type=offline`;

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
            <LoginCard>
                <div className="flex flex-col items-center w-full">
                    <div className="bg-lime-500 rounded-full flex items-center justify-center w-20 h-20 mb-4 mx-auto">
                        <Logo />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800 text-center w-full">한입코딩</h1>
                    <p className="text-gray-600 mt-2 text-center w-full">계속하려면 로그인하세요.</p>
                    <GoogleLoginButton onClick={() => (window.location.href = googleAuthUrl)} />
                    <p className="text-xs text-gray-500 text-center mt-4 w-full">계정이 없으시면 Google 계정으로 자동 생성됩니다.</p>
                </div>
            </LoginCard>
            <div className="flex justify-center mt-6 text-gray-400 text-xs gap-2">
                <a href="/privacy" className="hover:underline">
                    개인정보처리방침
                </a>
                <span>·</span>
                <a href="/terms" className="hover:underline">
                    이용약관
                </a>
            </div>
        </div>
    );
};

export default Login;
