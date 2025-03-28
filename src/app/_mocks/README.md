# 📁 _mocks

`_mocks` 폴더는 **개발 중 테스트용 가짜 데이터(mock data)**를 저장하는 공간입니다.

### 사용 목적
- API 연동 전 더미 데이터로 UI 테스트
- 유닛 테스트 시 데이터 시뮬레이션
- 데이터 구조 예시 공유

### 예시
- `user.mock.ts` → 사용자 정보 mock
- `course.mock.ts` → 코스 목록 mock
- `handlers.ts` → MSW(mock service worker) 핸들러 정의
- 즉, API 연결 전 가짜 데이터를 만들어 넣음 (가령 연동 전 테스트 문제들이나 userstats의 스탯 데이터 등..)

> 💡 실제 서버 없이도 프론트엔드 개발/테스트를 빠르게 진행할 수 있습니다.
