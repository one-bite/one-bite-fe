export interface ProblemHistory {
  historyId: number;
  userId: number;
  problemId: number;
  submittedAnswer: string;
  isCorrect: boolean;
  solveTime: number;
  submittedAt: [number, number, number, number, number, number, number];
}