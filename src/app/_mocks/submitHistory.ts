export interface SubmitHistory {
  historyId: number;
  userId: number;
  problemId: number;
  submittedAnswer: string;
  isCorrect: boolean;
  solveTime: number;
  submittedAt: [number, number, number, number, number, number, number];
}

export const submitHistory: SubmitHistory[] = [
  {
    historyId: 1,
    userId: 2,
    problemId: 1,
    submittedAnswer: "[1, 2, 3]",
    isCorrect: true,
    solveTime: 0,
    submittedAt: [2025, 5, 10, 23, 17, 19, 309884222]
  },
  {
    historyId: 2,
    userId: 2,
    problemId: 2,
    submittedAnswer: "'hello'",
    isCorrect: true,
    solveTime: 0,
    submittedAt: [2025, 5, 10, 18, 38, 33, 411007389]
  },
  {
    historyId: 3,
    userId: 2,
    problemId: 3,
    submittedAnswer: "if (x > 0)",
    isCorrect: false,
    solveTime: 0,
    submittedAt: [2025, 5, 10, 7, 40, 44, 908933737]
  },
  {
    historyId: 4,
    userId: 2,
    problemId: 4,
    submittedAnswer: "for i in range(5):",
    isCorrect: true,
    solveTime: 0,
    submittedAt: [2025, 5, 10, 1, 47, 33, 924981145]
  },
  {
    historyId: 5,
    userId: 2,
    problemId: 5,
    submittedAnswer: "define func()",
    isCorrect: false,
    solveTime: 0,
    submittedAt: [2025, 5, 10, 7, 51, 21, 857393307]
  },
  {
    historyId: 6,
    userId: 2,
    problemId: 6,
    submittedAnswer: "a{1}",
    isCorrect: false,
    solveTime: 0,
    submittedAt: [2025, 5, 10, 15, 8, 41, 13374818]
  },
  {
    historyId: 7,
    userId: 2,
    problemId: 7,
    submittedAnswer: "{'a', 1, 'b', 2}",
    isCorrect: false,
    solveTime: 0,
    submittedAt: [2025, 5, 10, 9, 20, 57, 202042032]
  },
  {
    historyId: 8,
    userId: 2,
    problemId: 8,
    submittedAnswer: "convert(10)",
    isCorrect: false,
    solveTime: 0,
    submittedAt: [2025, 5, 10, 21, 8, 23, 12734085]
  },
  {
    historyId: 9,
    userId: 2,
    problemId: 9,
    submittedAnswer: "insert()",
    isCorrect: false,
    solveTime: 0,
    submittedAt: [2025, 5, 10, 9, 4, 20, 501231443]
  },
  {
    historyId: 10,
    userId: 2,
    problemId: 10,
    submittedAnswer: "my var",
    isCorrect: false,
    solveTime: 0,
    submittedAt: [2025, 5, 10, 9, 59, 5, 376980074]
  }
];
