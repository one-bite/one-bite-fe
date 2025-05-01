import { NextRequest, NextResponse } from "next/server";

export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};

export function middleware(request: NextRequest) {
    const start = Date.now();

    const method = request.method;
    const path = request.nextUrl.pathname;
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

    const response = NextResponse.next();
    const duration = Date.now() - start;
    const status = response.status;

    console.log(`[${new Date().toISOString()}] ${method} ${path} → ${status} (${duration}ms) from ${ip}`);

    return response;
}
