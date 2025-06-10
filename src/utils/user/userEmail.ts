import { setCookie, deleteCookie, getCookie } from "../auth/tokenUtils";

const EMAIL_KEY = "user_email";
const EMAIL_UPDATED_EVENT = "userEmailUpdated";

export function setUserEmail(email: string) {
    setCookie(EMAIL_KEY, email, 1);
    window.dispatchEvent(new Event(EMAIL_UPDATED_EVENT));
}

export function clearUserEmail() {
    deleteCookie(EMAIL_KEY);
    window.dispatchEvent(new Event(EMAIL_UPDATED_EVENT));
}

export function getUserEmail(): string | null {
    return getCookie(EMAIL_KEY);
}

export const USER_EMAIL_EVENT = EMAIL_UPDATED_EVENT;
