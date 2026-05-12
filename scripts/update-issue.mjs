import http from 'http';

const comment = `## 완료

인사이트 메뉴 + 첫 블로그 글 구현 완료. 커밋 d0cad7b, push 완료.

### 진행 내용
- 네비게이션에 '인사이트' 메뉴 추가 (데스크톱 + 모바일 모두)
- Nuxt Content v3 모듈 설정 (content.config.ts, better-sqlite3, @tailwindcss/typography)
- /insights 목록 페이지: 카드 형태 (제목, 요약, 날짜)
- /insights/[slug] 상세 페이지: prose 다크 테마 타이포그래피
- 첫 번째 글 작성: '내 제품이 없으면 가장 고통받는 사람이 누구인가?'
  - 분량: 약 1200자
  - atee CTA 자연스럽게 포함 (마지막 단락)
- nuxt generate 빌드 성공, 모든 라우트 정적 프리렌더 확인

### 막힌 것
없음

---
### 겸님 결정 필요 사항
> 1. GitHub Pages 배포가 자동으로 트리거되는지 확인 부탁드립니다 (GitHub Actions 설정에 따라 다를 수 있음)
> 2. 블로그 글 내용/톤 수정이 필요하면 말씀해 주세요`;

const body = JSON.stringify({ status: 'done', comment });

const req = http.request({
  hostname: '127.0.0.1',
  port: 3100,
  path: `/api/issues/${process.env.PAPERCLIP_TASK_ID}`,
  method: 'PATCH',
  headers: {
    'Authorization': `Bearer ${process.env.PAPERCLIP_API_KEY}`,
    'Content-Type': 'application/json; charset=utf-8',
    'X-Paperclip-Run-Id': process.env.PAPERCLIP_RUN_ID || ''
  }
}, res => {
  let d = '';
  res.on('data', c => d += c);
  res.on('end', () => console.log(res.statusCode, d.substring(0, 300)));
});
req.write(body);
req.end();
