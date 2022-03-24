import type { JsxElement } from ".";

export type JsxComponent<P> = (props: P) => JsxElement | null | undefined;
