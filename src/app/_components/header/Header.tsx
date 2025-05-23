"use client";

//import { usePathname } from "next/navigation";
import { Navbar, NavbarBrand, NavbarContent, Link, DropdownTrigger, Dropdown, Avatar } from "@nextui-org/react";
import { Logo } from "../icon/LogoIcon";
import UserStats from "./UserStats";
import ProfileMenu from "./ProfileMenu"; // 추가!
import { getStreak, getPoint, getRank } from "@/utils/user";
import { useState, useEffect } from "react";
import { initStreak, initPoint, initRank } from "@/utils/user"; // 초기화 함수들

export default function App() {
    //const pathname = usePathname();
    initStreak();
    initPoint();
    initRank();

    const [streak, setStreak] = useState(getStreak());
    const [point, setPoint] = useState(getPoint());
    const [rank, setRank] = useState(getRank());

    useEffect(() => {
        const handleStorageChange = () => {
            setStreak(getStreak());
            setPoint(getPoint());
            setRank(getRank());
        };

        window.addEventListener("userStatsUpdated", handleStorageChange);
        return () => {
            window.removeEventListener("userStatsUpdated", handleStorageChange);
        };
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
                <UserStats streak={streak.totalStreak} point={point} rank={rank.rank}/> {/* ✅ 아바타 왼쪽에 삽입 */}
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
