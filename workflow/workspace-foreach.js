const { spawn } = require('child_process');
const gs=require('glob').sync;
const ws=require('../package.json').workspaces;
const match = '{'+ws.filter(s=>!s.startsWith('!')).join(',')+'}';
const ignore ='{'+ws.filter(s=>s.startsWith('!')).map(s=>s.substr(1)).join(',')+'}';
console.log('match', match);
console.log('ignore', ignore);

(async () => {
  const results = [];
  const dirs = gs(match, { ignore });
  for (const [i, dir] of dirs.entries()) {
    results.push(await new Promise((resolve) => {
      console.log(dir);
      const cmd = `workflow/do-ws`;
      const args = [dir, process.argv[2]];
      console.log(`foreach (${i+1}/${dirs.length}):`, ...args);
      const childProcess = spawn(cmd, args)
      .on('exit', code => {
        if (code === 0) {
          console.log(`${dir} ${process.argv[2]} ended successfully`);
        } else {
          console.error(`${dir} ${process.argv[2]} failed with code`, code);
        }
        resolve({dir, cmd: process.argv[2], code});
      });
      childProcess.stdout.pipe(process.stdout);
      childProcess.stderr.pipe(process.stderr);
    }));
  }
  const errors = results.filter(({code}) => code !== 0);
  if (errors.length > 0) {
    for (e of errors) {
      console.error(`${error.dir} ${error.cmd} failed with code`, code);
    }
    process.exit(1);
  }
  process.exit(0);
})();