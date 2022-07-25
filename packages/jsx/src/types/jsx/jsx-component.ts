import type { JsxElement } from "./index.js";

export type JsxComponent<P> = (props: P) => JsxElement | null | undefined;
