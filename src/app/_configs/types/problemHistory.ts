export interface ProblemHistory {
  historyId: number;
  userId: number;
  problem: {
    problemId: number;
    title: string;
    topics: [
      {
        topicId: number;
        code: string;
        name: string;
        desciption: null;
        total: number;
      }
    ]
  };
  submittedAnswer: string;
  isCorrect: boolean;
  solveTime: number;
  submittedAt: [number, number, number, number, number, number, number];
}