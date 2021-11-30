import * as dotenv from 'dotenv';
dotenv.config();
import { resolve } from 'path';
import findRoot from 'app-root-path';
import { registerAs } from '@nestjs/config';
import { NestThemeConfig } from '@ribajs/nest-theme';

const THEME_ACTIVE = process.env.THEME_ACTIVE || 'nest-riba-ssr-theme';
const ROOT = findRoot(process.cwd());
const PACKAGES = resolve(ROOT, '..');
const THEME_DIR = process.env.THEME_DIR || resolve(PACKAGES, THEME_ACTIVE);

export const app = {
  root: ROOT,
  port: Number(process.env.PORT) || 3000,
  environment:
    process.env.NODE_ENV === 'development' ? 'development' : 'production',
};

export const theme: NestThemeConfig = {
  active: THEME_ACTIVE,
  themeDir: THEME_DIR,
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
