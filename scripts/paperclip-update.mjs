import http from 'http';

const comment = `## 완료

### 백엔드 (opt92-management) - 이전 하트비트에서 완료
- User 모델 (Prisma): email, password(hashed), name, phone, createdAt
- POST /api/auth/register: 회원가입 (bcrypt 해싱, JWT 발급)
- POST /api/auth/user-login: 로그인 (JWT 발급)
- GET /api/auth/me: 현재 사용자 정보 조회
- CORS 설정 완료 (atee.app 도메인)

### 프론트엔드 (atee-landing) - 이번 하트비트
- useAuth composable: JWT 토큰 관리, 로그인 상태, localStorage 저장
- /register 페이지: 회원가입 폼 (이메일, 비밀번호, 이름, 연락처)
- /login 페이지: 로그인 폼
- 네비게이션: 로그인 시 사용자 이름 + 로그아웃 버튼, 미로그인 시 로그인/시작하기 버튼
- 시작하기 버튼: 미로그인 -> /register, 로그인 -> /apply
- 빌드 검증 완료, GitHub Pages 배포 push 완료 (f4799db)`;

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
req.on('error', e => console.error('Error:', e.message));
req.write(body);
req.end();
