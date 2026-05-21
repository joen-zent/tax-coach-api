# tax-coach-api

연말정산 컨설팅 서비스의 백엔드 API 서버입니다.

단순 환급액 계산을 넘어, 사용자의 소비 및 공제 현황을 분석하여 **실질적인 절세 행동 가이드**를 제공합니다.

## 기술 스택

| 분류 | 기술 |
|------|------|
| Runtime | Node.js |
| Framework | NestJS |
| Language | TypeScript |
| ORM | TypeORM |
| Database | PostgreSQL (Vercel Postgres) |

## 프로젝트 구조

```
src/
├── common/
│   └── filters/          # 전역 예외 처리
├── database/
│   └── database.config.ts  # DB 연결 설정
├── app.module.ts
├── app.controller.ts
├── app.service.ts
└── main.ts
```

## 개발 환경 세팅

### 1. 레포 클론 및 의존성 설치

```bash
git clone https://github.com/joen-zent/tax-coach-api.git
cd tax-coach-api
npm install
```

### 2. 환경 변수 설정

`.env.example`을 복사하여 `.env` 파일을 생성합니다.

```bash
cp .env.example .env
```

Vercel Postgres 연결 정보를 `.env`에 입력합니다.
([Vercel Dashboard](https://vercel.com/dashboard) > Storage > Postgres에서 확인)

```env
NODE_ENV=development
PORT=3000
POSTGRES_URL=postgres://...
```

### 3. 서버 실행

```bash
# 개발 모드 (파일 변경 자동 반영)
npm run start:dev

# 프로덕션 빌드 후 실행
npm run build
npm run start:prod
```

서버가 실행되면 `http://localhost:3000/api` 에서 확인할 수 있습니다.

### 4. 헬스체크 확인

```bash
curl http://localhost:3000/api/health
```

```json
{
  "status": "ok",
  "timestamp": "2026-05-20T00:00:00.000Z"
}
```

## 주요 스크립트

```bash
npm run start:dev   # 개발 서버 실행
npm run build       # 프로덕션 빌드
npm run test        # 테스트 실행
npm run test:cov    # 테스트 커버리지
```
