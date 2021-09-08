/**
 * Simplified version of https://github.com/YuzuJS/setImmediate
 * TODO Port tests
 */

interface Task {
  callback: (...args: any) => any;
  args: any[];
}

let nextHandle = 1; // Spec says greater than zero
const tasksByHandle: { [key: string]: Task } = {};
let currentlyRunningATask = false;
const messagePrefix = "setImmediate$" + Math.random() + "$";

const onGlobalMessage = function (event: MessageEvent) {
  if (
    event.source === window &&
    typeof event.data === "string" &&
    event.data.indexOf(messagePrefix) === 0
  ) {
    runIfPresent(+event.data.slice(messagePrefix.length));
  }
};

window.addEventListener("message", onGlobalMessage, false);

function registerImmediate(handle: number) {
  window.postMessage(messagePrefix + handle, "*");
}

function _setImmediate(callback: (...args: any) => any, ...args: any[]) {
  console.debug("Use setImmediate polyfill");
  // Callback can either be a function or a string
  if (typeof callback !== "function") {
    callback = new Function("" + callback) as (...args: any) => any;
  }
  // Store and register the task
  const task = { callback: callback, args };
  tasksByHandle[nextHandle] = task;
  registerImmediate(nextHandle);
  return nextHandle++;
}

function _clearImmediate(handle: number) {
  delete tasksByHandle[handle];
}

function run(task: Task) {
  const callback = task.callback;
  const args = task.args;
  callback(...args);
}

function runIfPresent(handle: any) {
  // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
  // So if we're currently running a task, we'll need to delay this invocation.
  if (currentlyRunningATask) {
    // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
    // "too much recursion" error.
    setTimeout(runIfPresent, 0, handle);
  } else {
    const task = tasksByHandle[handle];
    if (task) {
      currentlyRunningATask = true;
      try {
        run(task);
      } finally {
        _clearImmediate(handle);
        currentlyRunningATask = false;
      }
    }
  }
}

export const setImmediate: typeof _setImmediate =
  (window as any).setImmediate || _setImmediate;
export const clearImmediate: typeof _clearImmediate =
  (window as any).clearImmediate || _clearImmediate;
