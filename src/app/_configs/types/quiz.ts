export type QuestionType = "multiple_choice" | "short_answer" | "true_false";

export interface ProblemDescription {
  question: string;
  options: string[];
}

export interface QuizProblem {
  problemId: number;
  questionType: QuestionType;
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

export interface AiProblemRequest {
  parentProblemId: number;
  description: ProblemDescription;
  topics: string[];
  questionType: QuestionType;
}

export interface AiProblemResponse {
  title: string;
  description: ProblemDescription;
  questionType: QuestionType;
  answer: string;
  point: number;
  ai: boolean;
  commentary: string;
}

export interface ChallengeResponse {
  leftChance:number; // 남은 목숨
  score: number; // 지금까지 획득한 총 점수
  problem: QuizProblem;
}