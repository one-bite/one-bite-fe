"use client";

import { DropdownItem, DropdownMenu } from "@nextui-org/react";
import { useRouter } from "next/navigation";
// import { ThemeSwitcher } from "@/app/_components/ThemeSwitcher";
import { useEffect, useState } from "react";
import GoogleIcon from "../icon/GoogleIcon";
import { fetchLogoutFromGoogle, removeLocalUserData } from "@/utils/apis/login";

export default function ProfileMenu() {
    const router = useRouter();
    const [userEmail, setUserEmail] = useState<string | null>(null);

    useEffect(() => {
        if (typeof window === "undefined") return;
        setUserEmail(localStorage.getItem("user_email"));
    }, []);

    const handleAction = (key: React.Key) => {
        switch (key) {
            case "log":
                router.push("/log");
                break;
            case "profile":
                router.push("/my");
                break;
            case "login":
                router.push("/login");
                break;
            case "logout":
                fetchLogoutFromGoogle();
                removeLocalUserData(); 
                router.push("/");
                break;
            case "course":
                router.push("/course");
                break;
            case "clearLocal":
                localStorage.clear();
                alert("로컬 스토리지가 초기화되었습니다.");
            default:
                break;
        }
    };
    

    return (
        <DropdownMenu aria-label="Profile Actions" variant="flat" onAction={handleAction}>
            {userEmail ? (
                <DropdownItem key="profile">
                    <p>마이페이지</p>
                </DropdownItem>
            ) : (
                <DropdownItem isDisabled className="opacity-100 text-foreground cursor-default">
                    <p className="font-semibold">환영합니다!</p>
                </DropdownItem>
            )}

            {userEmail ? (
                <DropdownItem key="logout">
                    <p>로그아웃</p>
                </DropdownItem>
            ) : (
                <DropdownItem key="login" className="h-10 gap-2">
                    <div className="flex items-center gap-2">
                        <GoogleIcon />
                        <p className="font-semibold">Google로 로그인</p>
                    </div>
                </DropdownItem>
            )}

            <DropdownItem key="log">문제 풀이 내역</DropdownItem>

            <DropdownItem key="course">코스 변경</DropdownItem>

            <DropdownItem key="clearLocal">로컬스토리지 초기화</DropdownItem>

            {/* <DropdownItem key="theme-switcher">
                <ThemeSwitcher />
            </DropdownItem> */}
        </DropdownMenu>
    );
}
