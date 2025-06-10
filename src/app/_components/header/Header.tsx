"use client";

import { usePathname } from "next/navigation";
import { Navbar, NavbarBrand, NavbarContent, Link, DropdownTrigger, Dropdown, Avatar } from "@nextui-org/react";
import { Logo } from "../icon/LogoIcon";
import UserStats from "./UserStats";
import ProfileMenu from "./ProfileMenu"; // 추가!
import { getStreak, getRank } from "@/utils/user";
import { useState, useEffect } from "react";
import { initStreak, initRank } from "@/utils/user"; // 초기화 함수들
import { getCookie } from "@/utils/auth/tokenUtils";

export default function App() {
    const pathname = usePathname();
    initStreak();
    initRank();

    const [streak, setStreak] = useState(getStreak());
    const [ranks, setRanks] = useState(getRank());
    const [isLogin, setIsLogin] = useState(false);

    useEffect(() => {
        const handleStorageChange = () => {
            setStreak(getStreak());
            setRanks(getRank());
        };

        window.addEventListener("userStatsUpdated", handleStorageChange);
        return () => {
            window.removeEventListener("userStatsUpdated", handleStorageChange);
        };
    }, []);

    useEffect(() => {
        const accessToken = getCookie("accessToken");
        const userEmail = getCookie("user_email");
        if (accessToken && userEmail) {
            setIsLogin(true);
        }

        const handleLogin = () => {
            const token = getCookie("accessToken");
            const email = getCookie("user_email");
            if (token && email) {
                setIsLogin(true);
            }
        };

        const handleLogout = () => {
            setIsLogin(false);
        };

        window.addEventListener("loginSuccess", handleLogin);
        window.addEventListener("logout", handleLogout);

        return () => {
            window.removeEventListener("loginSuccess", handleLogin);
            window.removeEventListener("logout", handleLogout);
        };
    }, []);

    const shouldHideStats = ["/login", "/onboarding"].includes(pathname);

    return (
        <Navbar className="bg-lime-500">
            <NavbarBrand>
                <Link href="/" className="flex items-center">
                    <Logo />
                    <p className="font-jungM text-white text-2xl">한입코딩</p>
                </Link>
            </NavbarBrand>

            <NavbarContent as="div" justify="end" className="items-center gap-3">
                {isLogin && !shouldHideStats && <UserStats streak={streak.nowStreak} rank={ranks.name} />}
                <Dropdown placement="bottom-end">
                    <DropdownTrigger>
                        <Avatar
                            isBordered
                            as="button"
                            className="transition-transform"
                            color="default"
                            name="Jason Hughes"
                            size="sm"
                            src="/icons/defaultAvatar.png"
                        />
                    </DropdownTrigger>
                    <ProfileMenu />
                </Dropdown>
            </NavbarContent>
        </Navbar>
    );
}
