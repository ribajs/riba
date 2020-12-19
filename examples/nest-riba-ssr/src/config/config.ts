/* eslint-disable @typescript-eslint/no-var-requires */
import { transpileModule, CompilerOptions, ModuleKind } from "typescript";
import { Script } from 'vm'
import * as YAML from 'yaml';
import fs = require('fs');
import * as dotenv from 'dotenv';
dotenv.config();
import { resolve } from 'path';
import findRoot = require('find-root');
import { registerAs } from '@nestjs/config';
import { ThemeConfig } from '@ribajs/ssr';

// TODO move this to theme module
const parseConfigFile = <T>(configPath: string) => {
  // Transpile typescript config file
  if (configPath.endsWith('.ts')) {
    const tSource = fs.readFileSync(configPath, 'utf8');
    const compilerOptions: CompilerOptions = {
      module: ModuleKind.CommonJS
    }
    const context = {
      exports: {
        themeConfig: {}
      },
      require
    };
    const jSource = transpileModule(tSource, { compilerOptions }).outputText;
    const script = new Script(jSource);
    script.runInNewContext(context);
    return context.exports.themeConfig as T;
  }
  // Parse yaml config file
  if (configPath.endsWith('.yaml')) {
    const result: T = YAML.parse(
      fs.readFileSync(configPath, 'utf8'),
    );
    return result;
  }
}

const THEME_ACTIVE = process.env.THEME_ACTIVE || 'nest-riba-ssr-theme';
const ROOT = findRoot(process.cwd());
const PACKAGES = resolve(ROOT, '..');
const THEME_DIR = resolve(PACKAGES, THEME_ACTIVE);
const THEME = parseConfigFile<ThemeConfig>(resolve(THEME_DIR, 'config', 'theme.ts'));

export const app = {
  root: ROOT,
  port: Number(process.env.PORT) || 3000,
  environment:
    process.env.NODE_ENV === 'development' ? 'development' : 'production',
};

export const theme: ThemeConfig = {
  ...THEME,
  active: THEME_ACTIVE,
  assetsDir: resolve(THEME_DIR, THEME.assetsDir),
  viewsDir: resolve(THEME_DIR, THEME.viewsDir),
  pageComponentsDir: resolve(THEME_DIR, THEME.pageComponentsDir),
};

/**
 * Options for express-session
 * @see https://github.com/expressjs/session
 */
export const session = {
  secret: process.env.SESSION_SECRET || 'Set your own string here!',
  resave: false,
  saveUninitialized: true,
  proxy: true,
  /**
   * Required for chrome >= 80
   * @see https://shopify.dev/tutorials/migrate-your-app-to-support-samesite-cookies
   * @see https://github.com/expressjs/session#cookiesamesite
   */
  cookie: {
    maxAge: 60 * 60 * 24 * 1000,
    secure: true,
    sameSite: 'none' as boolean | 'none' | 'lax' | 'strict',
  },
};

export const appConfig = registerAs('app', () => ({
  ...app,
}));

export const themeConfig = registerAs('theme', () => ({
  ...theme,
}));

export const sessionConfig = registerAs('session', () => ({
  ...theme,
}));
