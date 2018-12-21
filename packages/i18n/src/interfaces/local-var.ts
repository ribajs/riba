export interface ILocalPluralization {
  zero?: string;
  one?: string;
  two?: string;
  other?: string;
}

export interface ILocalVar {
  [name: string]: string | ILocalPluralization;
}
