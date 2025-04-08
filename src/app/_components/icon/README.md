## 아이콘 사용할 때 "JSX 구성 요소로 사용할 수 없습니다....." 오류
    return 처리해주면 됨

## className 으로 스타일 커스터마이징할 때 'IntrinsicAttributes' 형식에 'className' 속성이 없습니다. 오류
    함수 props에 className을 명시하지 않아서 생기는 타입 오류임.
    아래와 같이 선언 변경하면 해결 됨. 사이즈만 변경한다는 전제 있음.
'''
const PointIcon = ({ className }: { className?: string }) => {
  <svg className={className}> ... </svg>
};
'''
