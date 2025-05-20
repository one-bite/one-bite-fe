const EMAIL_KEY = "user_email";
const EMAIL_UPDATED_EVENT = "userEmailUpdated";

export function setUserEmail(email: string) {
  localStorage.setItem(EMAIL_KEY, email);
  window.dispatchEvent(new Event(EMAIL_UPDATED_EVENT));
}

export function clearUserEmail() {
  localStorage.removeItem(EMAIL_KEY);
  window.dispatchEvent(new Event(EMAIL_UPDATED_EVENT));
}

export function getUserEmail(): string | null {
  return localStorage.getItem(EMAIL_KEY);
}

export const USER_EMAIL_EVENT = EMAIL_UPDATED_EVENT;
