export type QuestionType = "multiple_choice" | "short_answer" | "true_false";

export interface ProblemDescription {
  question: string;
  options: string[];
}

export interface QuizProblem {
  categoryId: number;
  title: string;
  description: ProblemDescription;
  questionType: QuestionType;
  hint: string;
  answer: string;
  point: number;
  topicCodes: string[];
}

export interface TodayQuizProblem {
  problemId: number;
  title: string;
  description: {
    question: string;
    options: string[];
  };
}

export interface TodayQuizResponse {
  problemStatus: boolean[];
  problemList: TodayQuizProblem[];
}