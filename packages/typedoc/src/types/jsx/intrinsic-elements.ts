/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/no-namespace */
import type {
  JsxTsdSearchProps,
  JsxTsdNavigationPrimaryProps,
  JsxTsdNavigationSecondaryProps,
  JsxTsdNavbarProps,
  JsxTsdMemberSignaturesProps,
} from "./index.js";

export interface TsdIntrinsicElements {
  // Custom Elements
  "tsd-search": JsxTsdSearchProps;
  "tsd-navigation-primary": JsxTsdNavigationPrimaryProps;
  "tsd-navigation-secondary": JsxTsdNavigationSecondaryProps;
  "tsd-navbar": JsxTsdNavbarProps;
  "tsd-member-signatures": JsxTsdMemberSignaturesProps;
}

declare global {
  namespace JSX {
    // This extends the IntrinsicElements interface defined in @ribajs/jsx
    interface IntrinsicElements extends TsdIntrinsicElements {}
  }
}
