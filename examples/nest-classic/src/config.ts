/* eslint-disable @typescript-eslint/no-var-requires */
import * as YAML from 'yaml';
import fs = require('fs');
import * as dotenv from 'dotenv';
dotenv.config();
import { resolve } from 'path';
import findRoot = require('find-root');
import { ThemeConfig } from './types';

const THEME_ACTIVE = process.env.THEME_ACTIVE || 'nest-classic-theme';
const ROOT = findRoot(process.cwd())
const PACKAGES = resolve(ROOT, '..');
const THEME_DIR = resolve(PACKAGES, THEME_ACTIVE);
const THEME: ThemeConfig = YAML.parse(
  fs.readFileSync(resolve(THEME_DIR, 'config', 'theme.yaml'), 'utf8'),
);

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

export const moduleConfig = () => ({
  app,
  theme,
  session,
});
