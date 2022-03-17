/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/no-namespace */
/**
 * Custom JSX module designed specifically for Ribajs's needs.
 * When overriding a default TypeDoc theme output, your implementation must create valid {@link Element}
 * instances, which can be most easily done by using TypeDoc's JSX implementation. To use it, set up
 * your tsconfig with the following compiler options:
 * ```json
 * {
 *     "jsx": "react",
 *     "jsxFactory": "JSX.createElement",
 *     "jsxFragmentFactory": "JSX.Fragment"
 * }
 * ```
 * @see https://github.com/TypeStrong/typedoc/blob/master/src/lib/utils/jsx.ts
 * @module
 */

import type {
  JsxElement,
  JsxChildren,
  JsxComponent,
  BasicIntrinsicElements
} from "./types/index.js";
import { isCustomElement, jsonStringify, escapeHtml } from "@ribajs/utils/src/index.js";
import { JsxFragment } from "./jsx-fragment.js";
import { Raw } from "./jsx-raw.js";

export const htmlVoidElements = new Set([
  "area",
  "base",
  "br",
  "col",
  "embed",
  "hr",
  "img",
  "input",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr"
]);

/**
 * JSX factory function to create an "element" that can later be rendered with {@link renderElement}
 * @param tag
 * @param props
 * @param children
 */
export function createElement(
  tag: typeof JsxFragment | string | JsxComponent<any>,
  props: Record<string, unknown> | null,
  ...children: JsxChildren[]
): JsxElement {
  return { tag, props, children };
}

export function renderElement(element: JsxElement | null | undefined): string {
  if (!element) {
    return "";
  }

  const { tag, props, children } = element;

  if (typeof tag === "function") {
    if (tag === Raw) {
      return String((props as any).html);
    }
    return renderElement(tag(Object.assign({ children }, props)));
  }

  const html: string[] = [];

  if (tag !== JsxFragment) {
    html.push("<", tag);

    for (const [key, val] of Object.entries(props ?? {})) {
      if (val == null) continue;

      if (typeof val == "boolean" && !isCustomElement(tag)) {
        if (val) {
          html.push(" ", key);
        }
      } else {
        html.push(" ", key, "=", jsonStringify(val));
      }
    }
  }

  let hasChildren = false;
  if (children.length) {
    hasChildren = true;
    if (tag !== JsxFragment) html.push(">");
    renderChildren(children);
  }

  if (tag !== JsxFragment) {
    if (!hasChildren) {
      if (htmlVoidElements.has(tag)) {
        html.push("/>");
      } else {
        html.push("></", tag, ">");
      }
    } else {
      html.push("</", tag, ">");
    }
  }

  return html.join("");

  function renderChildren(children: JsxChildren[]) {
    for (const child of children) {
      if (!child) continue;

      if (Array.isArray(child)) {
        renderChildren(child);
      } else if (typeof child === "string" || typeof child === "number") {
        html.push(escapeHtml(child.toString()));
      } else {
        html.push(renderElement(child));
      }
    }
  }
}

declare global {
  var jsxCreateElement: typeof createElement;
  var jsxFragment: typeof JsxFragment;
  /**
   * TypeScript's rules for looking up the JSX.IntrinsicElements and JSX.Element
   * interfaces are incredibly strange. It will find them if they are included as
   * a namespace under the createElement function, or globally, or, apparently, if
   * a JSX namespace is declared at the same scope as the factory function.
   * Hide this in the docs, hopefully someday TypeScript improves this and allows
   * looking adjacent to the factory function and we can get rid of this phantom namespace.
   *
   * We are using the global namespace to be able to extend the IntrinsicElements interface in other Ribajs Modules
   * @hidden
   */
  namespace JSX {
    // This must be an interface to be able to extend this interface in other Ribajs Modules
    export interface IntrinsicElements extends BasicIntrinsicElements {}
    export { JsxElement as Element };
  }
}
declare const global: any;

// Set as global variable in Browser, Deno or Node
((global) || window).jsxCreateElement = createElement;
((global) || window).jsxFragment = JsxFragment;
