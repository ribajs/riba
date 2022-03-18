/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/no-namespace */
import type {
  JsxHtmlGlobalProps
} from "@ribajs/jsx/src/types/jsx";

export interface JsxTsdSearchProps extends JsxHtmlGlobalProps {
  /** The base url of the remote search server */
  "server-base-url"?: string;
}

export type JsxTsdNavbarProps = JsxHtmlGlobalProps;

export type JsxTsdNavigationProps = JsxHtmlGlobalProps;

export type JsxTsdNavigationPrimaryProps = JsxHtmlGlobalProps;

export type JsxTsdMemberSignaturesProps = JsxHtmlGlobalProps;

export interface TsdIntrinsicElements {
  // Custom Elements
  "tsd-search": JsxTsdSearchProps;
  "tsd-navigation-primary": JsxTsdNavigationPrimaryProps;
  "tsd-navigation-secondary": JsxTsdNavigationProps;
  "tsd-navbar": JsxTsdNavbarProps;
  "tsd-member-signatures": JsxTsdMemberSignaturesProps;
}

declare global {
  namespace JSX {
    // This extends the IntrinsicElements interface defined in @ribajs/jsx
    interface IntrinsicElements extends TsdIntrinsicElements {}
  }
}
