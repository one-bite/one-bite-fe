export type QuestionType = "multiple_choice" | "short_answer" | "true_false";

export interface ProblemDescription {
  question: string;
  options: string[];
}

export interface QuizProblem {
  problemId: number;
  type: QuestionType;
  title: string;
  description: ProblemDescription;
  answer: string;
  point: number;
  ai: boolean;
}

export interface TodayQuizResponse {
  problemStatus: boolean[];
  problemList: QuizProblem[];
}