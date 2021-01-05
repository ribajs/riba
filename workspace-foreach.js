const { execSync } = require('child_process');
const gs=require('glob').sync;
const ws=require('./package.json').workspaces;
const match = '{'+ws.filter(s=>!s.startsWith('!')).join(',')+'}';
const ignore ='{'+ws.filter(s=>s.startsWith('!')).map(s=>s.substr(1)).join(',')+'}';
console.log('match', match);
console.log('ignore', ignore);

gs(match, { ignore }).forEach(dir => {
  console.log(dir);
  const cmd = `./do-ws ${dir} ${process.argv[2]}`;
  console.log(cmd);
  console.log(execSync(cmd).toString('utf8'));
});

