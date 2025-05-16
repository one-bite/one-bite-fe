export type QuestionType = "multiple_choice" | "short_answer" | "true_false";

export interface ProblemDescription {
  question: string;
  options: string[];
}

export interface QuizProblem {
  problemId: number;
  categoryId: number;
  title: string;
  description: ProblemDescription;
  questionType: QuestionType;
  hint: string;
  answer: string;
  point: number;
  userId: number | null;
  topicNames: string[];
}

export interface TodayQuizProblem {
  problemId: number;
  type: QuestionType;
  title: string;
  answer: string;
  point: number;
  description: {
    question: string;
    options: string[];
  };
}

export interface TodayQuizResponse {
  problemStatus: boolean[];
  problemList: TodayQuizProblem[];
}