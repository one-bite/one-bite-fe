"use client";

//import { usePathname } from "next/navigation";
import { Navbar, NavbarBrand, NavbarContent, Link, DropdownTrigger, Dropdown, Avatar } from "@nextui-org/react";
import { Logo } from "../icon/LogoIcon";
import UserStats from "./UserStats";
import ProfileMenu from "./ProfileMenu"; // 추가!
import { getStreak, getRank } from "@/utils/user";
import { useState, useEffect } from "react";
import { initStreak, initRank } from "@/utils/user"; // 초기화 함수들

export default function App() {
    //const pathname = usePathname();
    initStreak();
    initRank();

    const [streak, setStreak] = useState(getStreak());
    const [rank, setRank] = useState(getRank());
    const [isLogin, setIsLogin] = useState(false);

    useEffect(() => {
        const handleStorageChange = () => {
            setStreak(getStreak());
            setRank(getRank());
        };

        window.addEventListener("userStatsUpdated", handleStorageChange);
        return () => {
            window.removeEventListener("userStatsUpdated", handleStorageChange);
        };
    }, []);

    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
            setIsLogin(true);
        }
    }, []);

    return (
        <Navbar className="bg-lime-500">
            <NavbarBrand>
                <Link href="/" className="flex items-center">
                    <Logo />
                    <p className="font-jungM text-white text-2xl">한입코딩</p>
                </Link>
            </NavbarBrand>

            <NavbarContent as="div" justify="end" className="items-center gap-6">
                {isLogin && (
                    <UserStats streak={streak.totalStreak} rank={rank.rank}/>
                )}
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
