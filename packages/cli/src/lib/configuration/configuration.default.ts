import { IConfiguration } from '../../interfaces';

export const defaultConfiguration = {
  language: 'ts',
  collection: '@ribajs/schematics',
  sourceRoot: 'src',
  templateEngine: 'html',
  styleLanguage: 'scss', 
  component: {
    path: 'components'
  },
  binder: {
    path: 'binders'
  },
  formatter: {
    path: 'formatters'
  },
  service: {
    path: 'services'
  },
} as IConfiguration;