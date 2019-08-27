export interface IConfiguration {
  collection: string;
  language: 'ts' | 'js';
  templateEngine: 'html' | 'pug';
  sourceRoot: string;
  styleLanguage: 'css' | 'scss',
  component: {
    path: string;
  },
  binder: {
    path: string;
  },
  formatter: {
    path: string;
  },
  service: {
    path: string;
  },
  [key: string]: any;
}