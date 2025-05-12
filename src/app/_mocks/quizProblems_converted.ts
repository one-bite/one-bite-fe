import { QuizProblem } from "@/app/_configs/types/quiz";

export const quizProblems: QuizProblem[] = [
  {
    categoryId: 1,
    title: "리스트 생성",
    description: {
      question: "다음 중 Python에서 리스트(List)를 생성하는 방법으로 올바른 것은?",
      options: [
        "(1, 2, 3)",
        "[1, 2, 3]",
        "{1, 2, 3}",
        "set(1, 2, 3)"
      ]
    },
    questionType: "multiple_choice",
    hint: "리스트는 대괄호로 생성해요.",
    answer: "2",
    point: 20,
    topicCodes: ["default-topic"]
  },
  {
    categoryId: 1,
    title: "자료형 판별",
    description: {
      question: "다음 중 문자열(String)인 값은 무엇인가요?",
      options: [
        "True",
        "3.14",
        "'hello'",
        "None"
      ]
    },
    questionType: "multiple_choice",
    hint: "문자열은 따옴표로 감싸져 있어요요",
    answer: "3",
    point: 20,
    topicCodes: ["default-topic"]
  },
  {
    categoryId: 1,
    title: "조건문 형식",
    description: {
      question: "Python의 조건문 형식 중 올바른 것은?",
      options: [
        "if x > 0",
        "if x > 0:",
        "if (x > 0)",
        "x > 0 then"
      ]
    },
    questionType: "multiple_choice",
    hint: "if (조건): 형식으로 작성해요.",
    answer: "2",
    point: 20,
    topicCodes: ["default-topic"]
  },
  {
    categoryId: 1,
    title: "반복문",
    description: {
      question: "다음 중 for문을 올바르게 사용한 예는?",
      options: [
        "for(i=0; i<5; i++)",
        "foreach i in 5",
        "loop i from 0 to 5",
        "for i in range(5):"
      ]
    },
    questionType: "multiple_choice",
    hint: "for i in range(5): 형식으로 작성해요.",
    answer: "4",
    point: 20,
    topicCodes: ["default-topic"]
  },
  {
    categoryId: 1,
    title: "함수 정의",
    description: {
      question: "Python에서 함수 정의 방법으로 올바른 것은?",
      options: [
        "function func()",
        "define func()",
        "def func():",
        "func -> ()"
      ]
    },
    questionType: "multiple_choice",
    hint: "함수 정의는 def 함수이름(): 형식으로 작성해요.",
    answer: "3",
    point: 20,
    topicCodes: ["default-topic"]
  },
  {
    categoryId: 1,
    title: "리스트 인덱싱",
    description: {
      question: "다음 중 리스트 a = [10, 20, 30]에서 20을 가져오는 코드는?",
      options: [
        "a[0]",
        "a[1]",
        "a(1)",
        "a{1}"
      ]
    },
    questionType: "multiple_choice",
    hint: "배열 인덱스는 0부터 시작해요.",
    answer: "2",
    point: 20,
    topicCodes: ["default-topic"]
  },
  {
    categoryId: 1,
    title: "딕셔너리 생성",
    description: {
      question: "다음 중 Python의 딕셔너리를 생성하는 올바른 방법은?",
      options: [
        "[a:1, b:2]",
        "{'a', 1, 'b', 2}",
        "{'a': 1, 'b': 2}",
        "dict = 'a':1,'b':2"
      ]
    },
    questionType: "multiple_choice",
    hint: "{키: 값} 형식으로 작성해요.",
    answer: "3",
    point: 20,
    topicCodes: ["default-topic"]
  },
  {
    categoryId: 1,
    title: "자료형 변환",
    description: {
      question: "다음 중 정수형 10을 문자열로 변환하는 코드는?",
      options: [
        "str(10)",
        "string(10)",
        "'10'",
        "convert(10)"
      ]
    },
    questionType: "multiple_choice",
    hint: "정수형을 문자열로 변환할 때는 str() 함수를 사용해요.",
    answer: "1",
    point: 20,
    topicCodes: ["default-topic"]
  },
  {
    categoryId: 1,
    title: "리스트 메서드",
    description: {
      question: "다음 중 리스트에 항목을 추가하는 메서드는?",
      options: [
        "add()",
        "insert()",
        "append()",
        "extend()"
      ]
    },
    questionType: "multiple_choice",
    hint: "리스트에 항목을 추가할 때는 append() 메서드를 사용해요.",
    answer: "3",
    point: 20,
    topicCodes: ["default-topic"]
  },
  {
    categoryId: 1,
    title: "변수 이름 규칙",
    description: {
      question: "다음 중 Python에서 유효한 변수 이름은?",
      options: [
        "2var",
        "my-var",
        "my var",
        "my_var"
      ]
    },
    questionType: "multiple_choice",
    hint: "유효한 변수 이름은 문자, 숫자, 밑줄(_)로 시작해야 해요.",
    answer: "4",
    point: 20,
    topicCodes: ["default-topic"]
  }
];
