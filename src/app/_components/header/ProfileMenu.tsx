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
            case "learn":
                router.push("/learn");
                break;
            case "profile":
                router.push("/my");
                break;
            case "course":
                router.push("/course");
                break;
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

            <DropdownItem key="learn">학습 시작하기</DropdownItem>

            <DropdownItem key="course">코스 변경</DropdownItem>

            {/* <DropdownItem key="theme-switcher">
                <ThemeSwitcher />
            </DropdownItem> */}
        </DropdownMenu>
    );
}
