export interface Item {
  src?: string;
  msrc?: string;
  w?: number;
  h?: number;
  width?: number;
  height?: number;
  title?: string;
  element?: HTMLImageElement;
  index?: number;
  [key: string]: any;
}
