export interface IConfiguration {
  language: 'ts' | 'js';
  templateEngine: 'html' | 'pug';
  sourceRoot: string;
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