import { spawn } from 'child_process';
import glob from 'glob';
const { sync: gs } = glob;
import { readFile } from 'fs/promises';

const loadJson = async (path) => {
  const url = new URL(path, import.meta.url);
  return JSON.parse(
    await readFile(
      new URL(path, import.meta.url), "utf8"
    )
  );
}

(async () => {

  const ws = (await loadJson('../package.json')).workspaces;

  const match = '{' + ws.filter(s => !s.startsWith('!')).join(',') + '}';
  const ignore = '{' + ws.filter(s => s.startsWith('!')).map(s => s.substr(1)).join(',') + '}';
  console.log('match', match);
  console.log('ignore', ignore);

  const results = [];
  const dirs = gs(match, { ignore });
  for (const [i, dir] of dirs.entries()) {
    results.push(await new Promise(async (resolve) => {
      console.log(dir);
      let pkg;
      try {
        pkg = await loadJson(`../${dir}/package.json`);
      } catch (error) {
        console.warn(`Package ${dir} has no package.json. Skipping...`);
        return resolve({dir, code: 0});
      }
      if (!pkg.scripts || !pkg.scripts[process.argv[2]]) {
        console.warn(`Package ${dir}: command ${process.argv[2]} not found. Skipping...`);
        return resolve({dir, code: 0});
      }
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
  const errors = results.filter(({ code }) => code !== 0);
  if (errors.length > 0) {
    for (error of errors) {
      if (error) {
        console.error(`${error.dir} ${error.cmd} failed with code`, error.code);
      }
    }
    process.exit(1);
  }
  process.exit(0);
})();