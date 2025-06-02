"use client"

import {useRouter} from "next/navigation";
import {useEffect} from "react";

const ActivityTracker = () => {
    const router = useRouter();

    useEffect(() => {
        const last = parseInt(localStorage.getItem("lastActivity") ?? "0", 10);
        const now = Date.now();
        const timeouts = 10 * 60 * 1000;

        if (now - last > timeouts) {
            console.warn("10분 동안 활동이 없어 자동으로 로그아웃 되었습니다.");
            localStorage.clear(); // 마지막 로그인 후 10분 지났으면 초기화
            router.replace("/login");
            return;
        }

        const updateActivity = () => {
            localStorage.setItem("lastActivity", Date.now().toString());
        };

        window.addEventListener("click", updateActivity);
        window.addEventListener("keydown", updateActivity);
        window.addEventListener("mousemove", updateActivity);
        window.addEventListener("scroll", updateActivity);
        window.addEventListener("touchstart", updateActivity);

        return () => {
            window.removeEventListener("click", updateActivity);
            window.removeEventListener("keydown", updateActivity);
            window.removeEventListener("mousemove", updateActivity);
            window.removeEventListener("scroll", updateActivity);
            window.removeEventListener("touchstart", updateActivity);
        };

    }, [router]);

    return null;
}

export default ActivityTracker;