import { NextRequest, NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - icons (icon files)
         */
        "/((?!api|_next/static|_next/image|favicon.ico|icons).*)",
    ],
};

interface DecodedToken {
    sub: string;
    new_user: boolean;
    roles?: string[];
    exp: number;
    iat: number;
}

// 보호된 라우트 목록
const protectedRoutes = ["/my", "/quiz", "/quiz-ai", "/challenge", "/course", "/log", "/result-challenge", "/result-streak"];

// 공개 라우트 목록
const publicRoutes = ["/login", "/onboarding", "/privacy", "/terms"];

export function middleware(request: NextRequest) {
    const start = Date.now();
    const method = request.method;
    const path = request.nextUrl.pathname;
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

    const accessToken = request.cookies.get("accessToken");
    const userEmail = request.cookies.get("user_email");

    // 토큰 상태 로깅
    console.log(`[${new Date().toISOString()}] ${request.method} ${request.nextUrl.pathname} → 토큰 상태:`, {
        hasAccessToken: !!accessToken,
        hasUserEmail: !!userEmail,
        path: request.nextUrl.pathname,
    });

    // 공개 라우트는 인증 체크 없이 통과
    if (publicRoutes.some((route) => path.startsWith(route))) {
        const response = NextResponse.next();
        logRequest(method, path, response.status, Date.now() - start, ip);
        return response;
    }

    // 루트 경로(/) 처리
    if (path === "/") {
        const response = NextResponse.next();
        logRequest(method, path, response.status, Date.now() - start, ip);
        return response;
    }

    // 보호된 라우트 체크
    const isProtectedRoute = protectedRoutes.some((route) => path.startsWith(route));

    if (isProtectedRoute) {
        // 쿠키에서 토큰 확인 (1순위)
        let accessToken = request.cookies.get("accessToken")?.value;

        // 쿠키에 토큰이 없으면 헤더에서 확인 (localStorage에서 온 요청)
        if (!accessToken) {
            const authHeader = request.headers.get("authorization");
            if (authHeader && authHeader.startsWith("Bearer ")) {
                accessToken = authHeader.substring(7);
            }
        }

        // 둘 다 없으면 로그인 페이지로 리다이렉트
        if (!accessToken) {
            console.log(`[${new Date().toISOString()}] ${method} ${path} → 인증 필요: 토큰 없음`);
            return NextResponse.redirect(new URL("/login", request.url));
        }

        try {
            // JWT 토큰 검증
            const decoded = jwtDecode<DecodedToken>(accessToken);
            const currentTime = Math.floor(Date.now() / 1000);

            // 토큰 만료 체크
            if (decoded.exp < currentTime) {
                console.log(`[${new Date().toISOString()}] ${method} ${path} → 토큰 만료: 토큰 만료`);
                const response = NextResponse.redirect(new URL("/login", request.url));
                response.cookies.delete("accessToken");
                response.cookies.delete("refreshToken");
                return response;
            }

            // 사용자 정보를 헤더에 추가 (옵션)
            const response = NextResponse.next();
            response.headers.set("x-user-email", decoded.sub);
            if (decoded.roles) {
                response.headers.set("x-user-roles", decoded.roles.join(","));
            }

            logRequest(method, path, response.status, Date.now() - start, ip, decoded.sub);
            return response;
        } catch (error) {
            console.error(`[${new Date().toISOString()}] ${method} ${path} → 토큰 검증 실패:`, error);
            const response = NextResponse.redirect(new URL("/login", request.url));
            response.cookies.delete("accessToken");
            response.cookies.delete("refreshToken");
            return response;
        }
    }

    // 일반 라우트는 그대로 통과
    const response = NextResponse.next();
    logRequest(method, path, response.status, Date.now() - start, ip);
    return response;
}

function logRequest(method: string, path: string, status: number, duration: number, ip: string, userEmail?: string) {
    const userInfo = userEmail ? ` [${userEmail}]` : "";
    console.log(`[${new Date().toISOString()}] ${method} ${path} → ${status} (${duration}ms) from ${ip}${userInfo}`);
}
