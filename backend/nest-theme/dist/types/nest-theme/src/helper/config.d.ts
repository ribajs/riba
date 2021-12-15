import type { ThemeConfig } from '@ribajs/ssr';
import type { NestThemeConfig, FullThemeConfig } from '../types';
export declare const validateThemeConfig: (themeConfig: ThemeConfig) => void;
export declare const validateNestThemeConfig: (nestThemeConfig: NestThemeConfig) => void;
export declare const validateFullThemeConfig: (fullThemeConfig: FullThemeConfig) => void;
export declare const loadConfig: <T>(searchConfigPaths: string[], env: string) => Promise<T>;
