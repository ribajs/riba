export interface IConfiguration {
  language: 'ts' | 'js';
  templateEngine: 'html' | 'pug';
  sourceRoot: string;
  [key: string]: any;
}