import { transpileModule, CompilerOptions, ModuleKind } from 'typescript';
import { Script } from 'vm';
import * as YAML from 'yaml';
import { readFileSync } from 'fs';

/**
 * Loads a pure TypeScript or yaml config file
 * @param configPath
 */
export const loadConfig = <T>(configPath: string) => {
  // Transpile typescript config file
  if (configPath.endsWith('.ts')) {
    const tSource = readFileSync(configPath, 'utf8');
    const compilerOptions: CompilerOptions = {
      module: ModuleKind.CommonJS,
    };
    const context = {
      exports: {
        themeConfig: {},
      },
      require,
    };
    const jSource = transpileModule(tSource, { compilerOptions }).outputText;
    const script = new Script(jSource);
    script.runInNewContext(context);
    return context.exports.themeConfig as T;
  }
  // Parse yaml config file
  if (configPath.endsWith('.yaml')) {
    const result: T = YAML.parse(readFileSync(configPath, 'utf8'));
    return result;
  }
};
