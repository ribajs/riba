export interface IElementIConfiguration {
  path: string;
  flat: boolean;
}

export interface IConfiguration {
  collection: string;
  language: 'ts' | 'js';
  templateEngine: 'html' | 'pug';
  sourceRoot: string;
  styleLanguage: 'css' | 'scss';
  component: IElementIConfiguration;
  binder: IElementIConfiguration;
  formatter: IElementIConfiguration;
  service: IElementIConfiguration;
  [key: string]: any;
}