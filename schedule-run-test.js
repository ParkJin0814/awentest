// node --env-file=.env schedule-run-test.mjs
// awen-schedule-agent 루트에서 실행

import { executeRun } from './service/schedule/schedule-run.js';

const run = {
  id: 9999,
  runtime_limits: { timeout_seconds: 60 },
  source_snapshot: {
    source_mode: 'public_repo',       // 'public_repo' | 'github'
    runtime_language: 'nodejs',
    nodejs_source_type: 'commonjs',
    repo_url: 'https://github.com/your-org/your-repo',
    branch: 'main',
    commit_hash: null,
    source_path: '',                  // 하위 폴더면 'functions/my-task'
    entry_file: 'index.js',
  },
  source_credentials: {
    token: process.env.TEST_GITHUB_TOKEN || null,  // public_repo면 null 가능
  },
  external_common: JSON.stringify({ env_variables: '{}', linked_db_hosting_id: null }),
};

const result = await executeRun(run);
console.log(JSON.stringify(result, null, 2));
process.exit(result.status === 'success' ? 0 : 1);
