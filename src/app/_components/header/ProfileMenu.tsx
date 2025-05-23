"use client";

import { DropdownItem, DropdownMenu } from "@nextui-org/react";
import { useRouter } from "next/navigation";
// import { ThemeSwitcher } from "@/app/_components/ThemeSwitcher";
import { useEffect, useState } from "react";
import GoogleIcon from "../icon/GoogleIcon";

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
                <DropdownItem key="profile" className="h-10 gap-2">
                    <p className="font-semibold">{userEmail}</p>
                </DropdownItem>
            ) : (
                <DropdownItem key="profile" className="h-10 gap-2">
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
