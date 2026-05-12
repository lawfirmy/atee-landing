import http from 'http';

const comment = `### 현재 상황
포트폴리오(사례) 섹션 구현 완료, 커밋 완료.

### 진행 내용
- 8개 서비스 첫 페이지 스크린샷을 Playwright로 캡쳐하여 public/portfolio/에 저장
  - 이슈에 적힌 URL 중 3개(bnbtips, pactery, booboo2)가 잘못되어 실제 URL 확인 후 수정
  - bnbtips.co.kr → bnb.tips, pactery.app → pactery.com, booboo2.com → booboolife.com
- 네비게이션에 "사례" 메뉴 추가 (/#works 앵커)
- Pricing 섹션 뒤에 Works 섹션 구현
  - 4열 반응형 그리드 (모바일 1열, 태블릿 2열, 데스크탑 4열)
  - 카드 UI: 썸네일 + 서비스명 + 설명 + 외부 링크 아이콘
  - 기존 디자인 톤(다크 테마, brand 컬러, reveal 애니메이션) 유지
- 빌드 성공 확인 (nuxt build 통과)
- 커밋: ddff525

### 막힌 것
없음

---
### 겸님 결정 필요 사항
> 아래 항목에 대해 결정해 주세요:
> 1. 서비스 설명 문구가 임의로 작성되었습니다. 각 서비스별 정확한 설명이 있으면 알려주세요.
> 2. 원격 push 진행 여부 — 현재 로컬 커밋만 되어 있습니다. push할까요?
> 3. 섹션 이름이 "사례"와 "만든 것들"로 되어 있는데, 다른 이름이 좋으면 말씀해 주세요.`;

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
  res.on('end', () => console.log(res.statusCode, d.substring(0, 200)));
});
req.write(body);
req.end();
