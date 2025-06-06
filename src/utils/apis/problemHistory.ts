import { ProblemHistory } from "@/app/_configs/types/problemHistory";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const fetchProblemHistory = async (): Promise<ProblemHistory[]> => {
  const response = await fetch(`${apiUrl}/users/history`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Error fetching problem history:", errorText);
    throw new Error("문제 이력을 가져오는데 실패했습니다.");
  }

  const data = await response.json();
  return data as ProblemHistory[];
};
