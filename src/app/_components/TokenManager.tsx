"use client";

import { useTokenRefresh } from "@/utils/hooks/useTokenRefresh";

export default function TokenManager() {
    useTokenRefresh();
    return null;
}
