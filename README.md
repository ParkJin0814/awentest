# WIP: schedule-run GitHub / Public Repo 소스 모드

`awen-schedule-agent`의 `service/schedule/schedule-run.js` 변경 스냅샷입니다.  
다른 환경에서 검토·테스트용 임시 업로드 목적입니다.

## 변경 요약

| 항목 | 내용 |
|------|------|
| 대상 파일 | `service/schedule/schedule-run.js` |
| 목적 | `inline` 외 `github`, `public_repo` 소스 모드 지원 |
| 호스트 요구 | `git` 바이너리 (컨테이너 밖, 에이전트 호스트) |

### 주요 변경

1. **`cloneRepository`** — repo clone, token 인증, `commit_hash` checkout
2. **`buildExecutionContext`** — `source_snapshot` / `source_credentials` 파싱, `sourceMode` 분기
3. **`executeRun`** — repo 모드: clone → `entry_file` 실행 / inline 모드: 기존 동작 유지
4. **레포 `package.json` 병합** — 기존 파일이 있으면 `type` 보존, `dependencies` 병합

## 디렉터리

```
.tmp/github-review/
├── README.md           # 이 파일
├── CODEX_TASK.md       # 원본 태스크 명세
├── diff/
│   └── schedule-run.patch
└── files/
    └── schedule-run.js # 변경된 전체 파일
```

## 메인 레포에 적용하기

```bash
# 패치 적용 (메인 레포 루트에서)
git apply .tmp/github-review/diff/schedule-run.patch

# 또는 파일 통째로 교체
cp .tmp/github-review/files/schedule-run.js service/schedule/schedule-run.js
```

## 임시 커밋 메시지 제안

```
wip: schedule-run에 github/public_repo 소스 모드 추가
```

## 내일 확인할 체크리스트

- [ ] `inline` 모드 기존 동작 회귀 없음
- [ ] `public_repo` — token 없이 clone + `entry_file` 실행
- [ ] `github` — `source_credentials.token`으로 private repo clone
- [ ] `commit_hash` 지정 시 해당 커밋 checkout
- [ ] `source_path` 하위 디렉터리를 workdir로 사용
- [ ] 레포에 기존 `package.json` 있을 때 `type` / `dependencies` 보존
- [ ] nodejs / python 각각 의존성 설치 후 실행
- [ ] 실행 후 `hostTaskDir` 정리 (`finally` 블록)

## GitHub에 올리기 (이 스냅샷만)

```bash
cd .tmp/github-review
git init
git add .
git commit -m "wip: schedule-run repo source mode review snapshot"
git branch -M main
git remote add origin <임시-repo-url>
git push -u origin main
```
# awentest
