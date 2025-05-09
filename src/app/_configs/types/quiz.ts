export type questionType = "multiple_choice" | "short_answer" | "true_false";
export type difficulty = "초급" | "중급" | "고급";

export interface ProblemDescription {
  question: string;
  options: string[];
}

export interface QuizProblem {
  id: number;
  category: string;
  user: number;
  title: string;
  description: ProblemDescription;
  answer: string;
  score: number;
  topics: string;
  questionType: questionType;
  difficulty: difficulty;
}