export type QuestionType = "multiple_choice" | "short_answer" | "true_false";
export type Difficulty = "초급" | "중급" | "고급";

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
  userId: number;
  topicCodes: string[];
  difficulty?: Difficulty; // CS-100
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