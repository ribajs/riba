// See https://github.com/nestjs/config/blob/master/lib/types/no-infer.type.type.ts
export type NoInferType<T> = [T][T extends any ? 0 : never];
