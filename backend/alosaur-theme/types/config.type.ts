// See https://github.com/nestjs/config/blob/master/lib/types/config.type.ts
export type ConfigType<T extends (...args: any) => any> = T extends (
  ...args: any
) => infer ReturnVal
  ? ReturnVal extends Promise<infer AsyncReturnVal> ? AsyncReturnVal
  : ReturnVal
  : any;
