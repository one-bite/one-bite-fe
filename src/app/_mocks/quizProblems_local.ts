import { QuizProblem } from "@/app/_configs/types/quiz";

export const quizProblems: QuizProblem[] = [
  {
    problemId: 1,
    categoryId: 1,
    title: "Python Basics",
    description: {
      question: "다음 중 Python에서 올바른 변수 선언 방식은 무엇인가요?",
      options: [
        "1variable = 10",
        "variable@ = 10",
        "variable_1 = 10",
        "variable# = 10"
      ]
    },
    questionType: "multiple_choice",
    hint: "",
    answer: "3",
    point: 10,
    userId: null,
    topicNames: ["basic_syntax"],
  },
  {
    problemId: 2,
    categoryId: 1,
    title: "Print Function",
    description: {
      question: "파이썬에서 콘솔에 텍스트를 출력하는 함수는?",
      options: []
    },
    questionType: "short_answer",
    hint: "",
    answer: "print",
    point: 10,
    userId: null,
    topicNames: ["basic_syntax"],
  },
  {
    problemId: 3,
    categoryId: 1,
    title: "Multi-line Comment Syntax",
    description: {
      question: "파이썬에서 여러 줄 주석은 \"\"\" 또는 '''로 작성한다.",
      options: [
        "O",
        "X"
      ]
    },
    questionType: "true_false",
    hint: "",
    answer: "1",
    point: 10,
    userId: null,
    topicNames: ["basic_syntax"],
  },
  {
    problemId: 4,
    categoryId: 1,
    title: "Multi-line Comment Symbol",
    description: {
      question: "파이썬에서 여러 줄 주석을 작성할 때 사용하는 기호는?",
      options: []
    },
    questionType: "short_answer",
    hint: "",
    answer: "\"\"\"",
    point: 10,
    userId: null,
    topicNames: ["basic_syntax"],
  },
  {
    problemId: 5,
    categoryId: 1,
    title: "File Extension",
    description: {
      question: "파이썬 파일은 .py 확장자를 사용한다.",
      options: [
        "O",
        "X"
      ]
    },
    questionType: "true_false",
    hint: "",
    answer: "1",
    point: 10,
    userId: null,
    topicNames: ["basic_syntax"],
  },
  {
    problemId: 6,
    categoryId: 1,
    title: "Comment Symbol",
    description: {
      question: "파이썬에서 주석은 # 기호로 시작한다.",
      options: [
        "O",
        "X"
      ]
    },
    questionType: "true_false",
    hint: "",
    answer: "1",
    point: 10,
    userId: null,
    topicNames: ["basic_syntax"],
  },
  {
    problemId: 7,
    categoryId: 1,
    title: "Indentation Requirement",
    description: {
      question: "파이썬 코드는 들여쓰기 없이도 실행된다.",
      options: [
        "O",
        "X"
      ]
    },
    questionType: "true_false",
    hint: "",
    answer: "2",
    point: 10,
    userId: null,
    topicNames: ["basic_syntax"],
  },
  {
    problemId: 8,
    categoryId: 1,
    title: "",
    description: {
      question: "여러 예외를 동시에 잡는 구문 예시를 입력하세요.",
      options: []
    },
    questionType: "short_answer",
    hint: "",
    answer: "except (ValueError, TypeError):",
    point: 10,
    userId: null,
    topicNames: [
      "exceptions"
    ]
  },
  {
    problemId: 9,
    categoryId: 1,
    title: "Boolean Value",
    description: {
      question: "파이썬에서 `True`는 부울 값이다.",
      options: [
        "O",
        "X"
      ]
    },
    questionType: "true_false",
    hint: "",
    answer: "1",
    point: 10,
    userId: null,
    topicNames: [
      "variables",
      "data_types"
    ]
  },
  {
    problemId: 10,
    categoryId: 1,
    title: "If Syntax",
    description: {
      question: "다음 중 올바른 `if` 문법은?",
      options: [
        "if x = 5:",
        "if x == 5:",
        "if (x == 5)",
        "if x == 5"
      ]
    },
    questionType: "multiple_choice",
    hint: "",
    answer: "2",
    point: 10,
    userId: null,
    topicNames: [
      "conditionals"
    ]
  },
  {
    problemId: 11,
    categoryId: 1,
    title: "If-Else Output",
    description: {
      question: "다음 코드의 출력은? `x = 3; if x > 5: print(\"A\"); else: print(\"B\")`",
      options: [
        "A",
        "B",
        "A B",
        "None"
      ]
    },
    questionType: "multiple_choice",
    hint: "",
    answer: "2",
    point: 10,
    userId: null,
    topicNames: [
      "conditionals"
    ]
  },
  {
    problemId: 12,
    categoryId: 1,
    title: "Else Usage",
    description: {
      question: "파이썬에서 `else`는 어떤 문과 함께 사용되나요?",
      options: [
        "for",
        "while",
        "if",
        "break"
      ]
    },
    questionType: "multiple_choice",
    hint: "",
    answer: "3",
    point: 10,
    userId: null,
    topicNames: [
      "conditionals"
    ]
  },
  {
    problemId: 13,
    categoryId: 1,
    title: "",
    description: {
      question: "다중 조건 분기에 사용하는 키워드를 입력하세요.",
      options: []
    },
    questionType: "short_answer",
    hint: "",
    answer: "elif",
    point: 10,
    userId: null,
    topicNames: [
      "control_flow",
      "loops"
    ]
  },
  {
    problemId: 14,
    categoryId: 1,
    title: "",
    description: {
      question: "무한 루프를 만들기 위해 사용하는 조건은?",
      options: [
        "1. False",
        "2. 0",
        "3. True",
        "4. None"
      ]
    },
    questionType: "multiple_choice",
    hint: "",
    answer: "3",
    point: 10,
    userId: null,
    topicNames: [
      "control_flow",
      "loops"
    ]
  },
  {
    problemId: 15,
    categoryId: 1,
    title: "",
    description: {
      question: "정수 타입을 입력하세요.",
      options: []
    },
    questionType: "short_answer",
    hint: "",
    answer: "int",
    point: 10,
    userId: null,
    topicNames: [
      "variables",
      "data_types"
    ]
  },
  {
    problemId: 16,
    categoryId: 1,
    title: "Variable Type Check",
    description: {
      question: "다음 코드의 출력은? `x = 5; print(type(x))`",
      options: [
        "<class 'str'>",
        "<class 'int'>",
        "<class 'float'>",
        "<class 'bool'>"
      ]
    },
    questionType: "multiple_choice",
    hint: "",
    answer: "2",
    point: 10,
    userId: null,
    topicNames: [
      "variables",
      "data_types"
    ]
  },
  {
    problemId: 17,
    categoryId: 1,
    title: "",
    description: {
      question: "문자열 양쪽 공백을 제거하는 메서드명을 입력하세요.",
      options: []
    },
    questionType: "short_answer",
    hint: "",
    answer: "strip",
    point: 10,
    userId: null,
    topicNames: [
      "strings",
      "string_methods"
    ]
  },
  {
    problemId: 18,
    categoryId: 1,
    title: "",
    description: {
      question: "f-string은 문자열 앞에 f를 붙여 사용한다.",
      options: [
        "O",
        "X"
      ]
    },
    questionType: "true_false",
    hint: "",
    answer: "1",
    point: 10,
    userId: null,
    topicNames: [
      "strings",
      "string_methods"
    ]
  },
  {
    problemId: 19,
    categoryId: 1,
    title: "",
    description: {
      question: "str.split()은 기본적으로 공백을 기준으로 분리한다.",
      options: [
        "O",
        "X"
      ]
    },
    questionType: "true_false",
    hint: "",
    answer: "1",
    point: 10,
    userId: null,
    topicNames: [
      "strings",
      "string_methods"
    ]
  },
  {
    problemId: 20,
    categoryId: 1,
    title: "",
    description: {
      question: "문자열을 소문자로 변환하는 메서드명을 입력하세요.",
      options: []
    },
    questionType: "short_answer",
    hint: "",
    answer: "lower",
    point: 10,
    userId: null,
    topicNames: [
      "strings",
      "string_methods"
    ]
  },
  {
    problemId: 21,
    categoryId: 1,
    title: "",
    description: {
      question: "값을 더해 할당하는 연산자를 입력하세요.",
      options: []
    },
    questionType: "short_answer",
    hint: "",
    answer: "+=",
    point: 10,
    userId: null,
    topicNames: [
      "operators"
    ]
  },
  {
    problemId: 22,
    categoryId: 1,
    title: "Division Return Type",
    description: {
      question: "파이썬에서 `/`는 항상 정수를 반환한다.",
      options: [
        "O",
        "X"
      ]
    },
    questionType: "true_false",
    hint: "",
    answer: "2",
    point: 10,
    userId: null,
    topicNames: [
      "operators"
    ]
  },
  {
    problemId: 23,
    categoryId: 1,
    title: "",
    description: {
      question: "정수 나눗셈 연산자를 입력하세요.",
      options: []
    },
    questionType: "short_answer",
    hint: "",
    answer: "//",
    point: 10,
    userId: null,
    topicNames: [
      "operators"
    ]
  },
  {
    problemId: 24,
    categoryId: 1,
    title: "",
    description: {
      question: "Python 함수는 def 키워드로 정의한다.",
      options: [
        "O",
        "X"
      ]
    },
    questionType: "true_false",
    hint: "",
    answer: "1",
    point: 10,
    userId: null,
    topicNames: [
      "functions"
    ]
  }
];
