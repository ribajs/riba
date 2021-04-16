export type TemplateFunction = () =>
  | Promise<HTMLElement | string | null>
  | HTMLElement
  | string
  | null;
