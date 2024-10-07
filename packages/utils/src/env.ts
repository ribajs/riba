// Credits
// * https://github.com/flexdinesh/browser-or-node
// * https://stackoverflow.com/a/33697246/1465919

// For real types see https://github.com/denoland/deno/blob/main/core/lib.deno_core.d.ts
declare const Deno: any;
declare const process: any;
declare const WorkerGlobalScope: any;
declare const importScripts: any;
declare const WorkerNavigator: any;

const isNode =
  typeof process !== "undefined" &&
  process.versions != null &&
  process.versions.node != null;

const isWebWorker =
  !isNode &&
  "undefined" !== typeof WorkerGlobalScope &&
  "function" === typeof importScripts &&
  navigator instanceof WorkerNavigator &&
  typeof self === "object" &&
  (self as any).constructor &&
  (self as any).constructor.name === "DedicatedWorkerGlobalScope";

/**
 * @see https://github.com/jsdom/jsdom/releases/tag/12.0.0
 * @see https://github.com/jsdom/jsdom/issues/1537
 */
const isJsDom =
  (typeof window !== "undefined" && window.name === "nodejs") ||
  (typeof navigator !== "undefined" &&
    (navigator.userAgent.includes("Node.js") ||
      navigator.userAgent.includes("jsdom")));

const isBrowser =
  !isJsDom &&
  !isNode &&
  !isWebWorker &&
  typeof window !== "undefined" &&
  typeof window.document !== "undefined";

const isDeno = typeof Deno !== "undefined" && typeof Deno.core !== "undefined";

export { isBrowser, isWebWorker, isNode, isJsDom, isDeno };
