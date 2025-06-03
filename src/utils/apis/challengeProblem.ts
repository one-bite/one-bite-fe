import { ChallengeResponse } from "app/_configs/types/quiz";

export const fetchChallengeProblems = async () : Promise<ChallengeResponse | null> => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const response = await fetch(`${apiUrl}/problem/challenge`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
        },
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error("Error fetching problems:", errorText);
        throw new Error("챌린지 문제 리스트를 가져오는 데 실패했습니다.");
    }

    const contentLength = response.headers.get("Content-Length");
  if (response.status === 204 || contentLength === "0") {
    return null;
  }

  const text = await response.text();
  if (!text) {
    return null;
  }

  try {
    const data: ChallengeResponse = JSON.parse(text);
    return data;
  } catch (err) {
    console.error("JSON 파싱 실패:", err);
    return null;
  }
};