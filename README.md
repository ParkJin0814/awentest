# schedule-run 로컬 테스트

`awen-schedule-agent`의 `executeRun`을 직접 호출해서  
`github` / `public_repo` 소스 모드를 로컬에서 테스트하는 스크립트입니다.

## 준비

1. `schedule-run-test.mjs`를 `awen-schedule-agent` 루트에 복사
2. `.env` 준비 (기존 `awen-schedule-agent/.env` 그대로 사용)

## 실행

```bash
# inline 모드 (기존 동작 확인)
node --env-file=.env schedule-run-test.mjs inline

# public repo 모드
node --env-file=.env schedule-run-test.mjs public_repo

# private github 모드 (token 필요)
TEST_GITHUB_TOKEN=ghs_xxxx node --env-file=.env schedule-run-test.mjs github
```

## 페이로드 수정

`schedule-run-test.mjs` 안의 `PAYLOADS` 객체에서 교체:

| 필드 | 설명 |
|------|------|
| `repo_url` | 테스트할 GitHub 레포 URL |
| `branch` | 브랜치명 |
| `entry_file` | 실행할 파일 (레포 루트 또는 `source_path` 기준) |
| `source_path` | 하위 폴더 지정 (없으면 `''`) |
| `commit_hash` | 특정 커밋 체크아웃 (없으면 `null`) |
