export type QuestionType = "multiple_choice" | "short_answer" | "true_false";
export type Difficulty = "초급" | "중급" | "고급";

export interface QuizProblem {
  id: number;
  topicId: number;
  title: string;
  description: string; // 향후 JSX나 Markdown 파싱도 가능
  type: QuestionType;
  difficulty: Difficulty;
  hint?: string;
  answer: string;
  options?: string[]; // 객관식인 경우
}
