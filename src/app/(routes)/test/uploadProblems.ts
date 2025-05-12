import { quizProblems } from "@/app/_mocks/quizProblems_upload";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const uploadProblems = async () => {
  try {
    console.log("업로드 요청 데이터:", JSON.stringify(quizProblems, null, 2));
    for (const problem of quizProblems) {
      const response = await fetch(`${apiUrl}/db/problems`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
        },
        body: JSON.stringify(problem),
      });
      if (!response.ok) {
        const text = await response.text();
        console.error("서버 응답 내용:", text);
        console.error("업로드 실패: ", response.status);
        return;
      }
      const data = await response.json();
      console.log("업로드 성공:", data);
    }
  } catch (error) {
    console.error("업로드 중 오류 발생:", error);
  }
};
