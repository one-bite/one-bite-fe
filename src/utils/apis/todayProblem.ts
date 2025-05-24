import {TodayQuizResponse} from "app/_configs/types/quiz";

export const fetchTodayProblems = async () : Promise<TodayQuizResponse | null> => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const response = await fetch(`${apiUrl}/users/today`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
        },
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error("Error fetching problems:", errorText);
        throw new Error("문제 리스트를 가져오는 데 실패했습니다.");
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
    const data: TodayQuizResponse = JSON.parse(text);
    return data;
  } catch (err) {
    console.error("JSON 파싱 실패:", err);
    return null;
  }
};