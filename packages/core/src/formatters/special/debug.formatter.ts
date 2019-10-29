export const debugFormatter = {
  name: 'debug',
  read(toPrint: any, level: 'log' | 'debug' | 'info' | 'error' | 'warn' = 'debug') {
    console[level](toPrint);
    return toPrint;
  },
};
