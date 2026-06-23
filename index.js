// entry file - runs inside Docker container
// tests: repo clone, package.json type:commonjs detection, dependency install

const axios = require('axios');

console.log('repo source mode: OK');
console.log('cjs require: OK');
console.log('axios version:', axios.VERSION ?? require('axios/package.json').version);
console.log('done at', new Date().toISOString());
