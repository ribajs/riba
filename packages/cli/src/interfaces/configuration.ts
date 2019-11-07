export interface ElementConfiguration {
  path: string;
  flat: boolean;
}

export interface Configuration {
  collection: string;
  language: 'ts' | 'js';
  templateEngine: 'html' | 'pug';
  sourceRoot: string;
  styleLanguage: 'css' | 'scss';
  component: ElementConfiguration;
  binder: ElementConfiguration;
  formatter: ElementConfiguration;
  service: ElementConfiguration;
  [key: string]: any;
}
