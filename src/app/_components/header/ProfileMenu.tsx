"use client";

import { DropdownItem, DropdownMenu } from "@nextui-org/react";
import { useRouter } from "next/navigation";
// import { ThemeSwitcher } from "@/app/_components/ThemeSwitcher";
import React, { useEffect, useState } from "react";
import GoogleIcon from "../icon/GoogleIcon";
import { fetchLogoutFromGoogle, removeLocalUserData } from "@/utils/apis/login";
import { getUserEmail, USER_EMAIL_EVENT } from "@/utils/user/userEmail";

export default function ProfileMenu() {
    const router = useRouter();
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const [mounted, setmounted] = useState(false);

    useEffect(() => {
        const updateEmail = () => setUserEmail(getUserEmail());
        updateEmail();

        window.addEventListener(USER_EMAIL_EVENT, updateEmail);
        setmounted(true);
        return () => window.removeEventListener(USER_EMAIL_EVENT, updateEmail);
    }, []);

    if (!mounted) return null;

    const handleAction = (key: React.Key) => {
        switch (key) {
            case "log":
                router.push("/log");
                break;
            case "login":
                router.push("/login");
                break;
            case "profile":
                router.push("/my");
                break;
            case "logout":
                fetchLogoutFromGoogle();
                removeLocalUserData();
                window.dispatchEvent(new Event("logout"));
                router.push("/login");
                break;
            default:
                break;
        }
    };

    const menuItems = userEmail ? [
        <DropdownItem key="profile">
            <p>마이페이지</p>
        </DropdownItem>,
        <DropdownItem key="log">문제 풀이 내역</DropdownItem>,
        <DropdownItem key="logout">
            <p>로그아웃</p>
        </DropdownItem>,
    ] : [
        <DropdownItem key ="welcome"isDisabled className="opacity-100 text-foreground cursor-default">
            <p className="font-semibold">환영합니다!</p>
        </DropdownItem>,
        <DropdownItem key="login" className="h-10 gap-2">
            <div className="flex items-center gap-2">
                <GoogleIcon />
                <p className="font-semibold">Google로 로그인</p>
            </div>
        </DropdownItem>
    ];

    return (
        <DropdownMenu aria-label="Profile Actions" variant="flat" onAction={handleAction}>
            {menuItems}
        </DropdownMenu>
    );
}
