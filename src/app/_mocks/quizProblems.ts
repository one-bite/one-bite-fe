export interface QuizProblem {
    id: number;
    topicId: number;
    title: string;
    description: string;
    type: "multiple_choice"; //현재로선 객관식만 지원
    difficulty: "초급" | "중급" | "고급";
    hint?: string;
    answer: string;
    options: string[];
  }
  
  export const quizProblems: QuizProblem[] = [
    {
      id: 1,
      topicId: 101,
      title: "리스트 생성",
      description: "다음 중 Python에서 리스트(List)를 생성하는 방법으로 올바른 것은?",
      type: "multiple_choice",
      difficulty: "초급",
      hint: "리스트는 대괄호로 생성해요.",
      answer: "[1, 2, 3]",
      options: ["(1, 2, 3)", "[1, 2, 3]", "{1, 2, 3}", "set(1, 2, 3)"],
    },
    {
      id: 2,
      topicId: 101,
      title: "자료형 판별",
      description: "다음 중 문자열(String)인 값은 무엇인가요?",
      type: "multiple_choice",
      difficulty: "초급",
      answer: "'hello'",
      options: ["True", "3.14", "'hello'", "None"],
    },
    {
      id: 3,
      topicId: 102,
      title: "조건문 형식",
      description: "Python의 조건문 형식 중 올바른 것은?",
      type: "multiple_choice",
      difficulty: "초급",
      answer: "if x > 0:",
      options: ["if x > 0", "if x > 0:", "if (x > 0)", "x > 0 then"],
    },
    {
      id: 4,
      topicId: 103,
      title: "반복문",
      description: "다음 중 for문을 올바르게 사용한 예는?",
      type: "multiple_choice",
      difficulty: "초급",
      answer: "for i in range(5):",
      options: ["for(i=0; i<5; i++)", "foreach i in 5", "loop i from 0 to 5", "for i in range(5):"],
    },
    {
      id: 5,
      topicId: 104,
      title: "함수 정의",
      description: "Python에서 함수 정의 방법으로 올바른 것은?",
      type: "multiple_choice",
      difficulty: "중급",
      answer: "def func():",
      options: ["function func()", "define func()", "def func():", "func -> ()"],
    },
    {
      id: 6,
      topicId: 104,
      title: "리스트 인덱싱",
      description: "다음 중 리스트 a = [10, 20, 30]에서 20을 가져오는 코드는?",
      type: "multiple_choice",
      difficulty: "초급",
      answer: "a[1]",
      options: ["a[0]", "a[1]", "a(1)", "a{1}"],
    },
    {
      id: 7,
      topicId: 105,
      title: "딕셔너리 생성",
      description: "다음 중 Python의 딕셔너리를 생성하는 올바른 방법은?",
      type: "multiple_choice",
      difficulty: "중급",
      answer: "{'a': 1, 'b': 2}",
      options: ["[a:1, b:2]", "{'a', 1, 'b', 2}", "{'a': 1, 'b': 2}", "dict = 'a':1,'b':2"],
    },
    {
      id: 8,
      topicId: 106,
      title: "자료형 변환",
      description: "다음 중 정수형 10을 문자열로 변환하는 코드는?",
      type: "multiple_choice",
      difficulty: "중급",
      answer: "str(10)",
      options: ["str(10)", "string(10)", "'10'", "convert(10)"],
    },
    {
      id: 9,
      topicId: 107,
      title: "리스트 메서드",
      description: "다음 중 리스트에 항목을 추가하는 메서드는?",
      type: "multiple_choice",
      difficulty: "초급",
      answer: "append()",
      options: ["add()", "insert()", "append()", "extend()"],
    },
    {
      id: 10,
      topicId: 108,
      title: "변수 이름 규칙",
      description: "다음 중 Python에서 유효한 변수 이름은?",
      type: "multiple_choice",
      difficulty: "초급",
      answer: "my_var",
      options: ["2var", "my-var", "my var", "my_var"],
    },
  ];
  