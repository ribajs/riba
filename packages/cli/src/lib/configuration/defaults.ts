import { IConfiguration } from '../../interfaces';

export const defaultConfiguration = {
  language: 'ts' as 'ts' | 'js',
  sourceRoot: 'src',
  templateEngine: 'html' as 'html' | 'pug',
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