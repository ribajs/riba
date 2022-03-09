import { Binder } from "../binder.js";

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
export class BlockBinder extends Binder<unknown> {
  static key = "block";
  static block = true;
  routine() {
    /**/
  }
}
