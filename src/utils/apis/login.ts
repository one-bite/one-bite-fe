//import { mockLoggedInUser } from "@/app/_mocks/mockUser";

export interface LoginResponseProps {
    accessToken: string;
    refreshToken: string;
    user_email: string;
}

export const fetchAccessTokenFromGoogle = async (code: string): Promise<LoginResponseProps> => {
    try {
        console.log('code:' + code)

        if (!code) {
            throw new Error("Authorization code is missing.");
        }

        const apiUrl = process.env.NEXT_PUBLIC_API_URL;

        const response = await fetch(`${apiUrl}/oauth/google?token=${code}`, {
            method: "GET",
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Login Failed: ", errorData);
            throw new Error("로그인 처리 중 오류가 발생했습니다.");
        }

        const data: LoginResponseProps = await response.json();
        return data;

    } catch (error) {
        console.error("Login Failed: ", error);
        throw new Error("로그인 처리 중 오류가 발생했습니다.");
    }
};

export const validateUserEmail = async (access_token: string, user_email: string): Promise<{ res: string; auth: boolean }> => {
    try {
        if (!access_token || !user_email) {
            throw new Error("Access token or user email is missing.");
        }

        const apiUrl = process.env.NEXT_PUBLIC_API_URL;

        const response = await fetch(`${apiUrl}oauth/google/auth?email=${user_email}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("API Fetch Failed: ", errorData);
            throw new Error("API 요청에 실패했습니다.");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Validation Failed: ", error);
        throw new Error("유효성 검사 중 오류가 발생했습니다.");
    }
};

export const removeLocalUserData = (): void => {
    if (typeof window === "undefined") return;
    localStorage.removeItem("access_token");
    localStorage.removeItem("user_email");
    // window.location.href = "/login";
    // Router 사용
};
