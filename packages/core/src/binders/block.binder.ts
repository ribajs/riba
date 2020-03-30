import { Binder } from "../interfaces";

export interface Assign {
  key: string;
  value: any;
}

/**
 * block
 * Blocks the binding for the current element and his childs.
 * @note Please note that `<script></script>`, `<style type="text/css"></style>`, `<template></template>` and `<code></code>` tags are blocked by default.
 * You can change this by setting the `blockNodeNames` option.
 * @example
 * <div rv-block="">
 *  <!-- After binding you should see `{ value }` because the binding is blocked here -->
 *  { value }
 * </div>
 */
export const blockBinder: Binder<Assign> = {
  name: "block",
  block: true,
  routine() {
    /**/
  },
};
