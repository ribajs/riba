export interface LocalPluralization {
  zero?: string;
  one?: string;
  two?: string;
  other?: string;
}

export interface LocalVar {
  [name: string]: string | LocalPluralization;
}
