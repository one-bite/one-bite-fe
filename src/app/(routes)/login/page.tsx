"use client";


import PageInfo from "@/app/_components/PageInfo";
import { Button, Card, CardBody } from "@nextui-org/react";
import GoogleIcon from "@/app/_components/icon/GoogleIcon";
import React from "react";
import env from "@/app/_configs/env";

const Login = () => {
    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${env.googleClientId}&access_type=offline&prompt=consent&redirect_uri=${env.frontendUrl}login/oauth&response_type=code&scope=email profile`;

    return (
        <div className="min-h-screen">
            <PageInfo title="로그인" description="계속하려면 Google로 로그인하세요." />
            <div className="flex justify-center items-center mt-16">
                <Card className="max-w-full w-[340px]">
                    <CardBody className="overflow-hidden flex flex-col justify-center items-center">
                        <Button
                            fullWidth
                            className="bg-white dark:bg-[#18181b]"
                            startContent={<GoogleIcon />}
                            onPress={() => (window.location.href = googleAuthUrl)}
                        >
                            Google 로그인
                        </Button>
                    </CardBody>
                </Card>
            </div>
            <div className="flex justify-center m-4 text-gray-500 text-xs">
                <p>계속하려면 Google로 로그인하세요.</p>
            </div>
        </div>
    );
};

export default Login;
