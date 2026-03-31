/**
 * Lightweight scheduling helper for modern browsers.
 */

interface Task {
  callback: (...args: any) => any;
  args: any[];
}

let nextHandle = 1; // Spec says greater than zero
const tasksByHandle: { [key: string]: Task } = {};

function _setImmediate(callback: (...args: any) => any, ...args: any[]) {
  // Callback can either be a function or a string
  if (typeof callback !== "function") {
    callback = new Function("" + callback) as (...args: any) => any;
  }
  // Store and register the task
  const task = { callback: callback, args };
  const handle = nextHandle++;
  tasksByHandle[handle] = task;
  setTimeout(() => runIfPresent(handle), 0);
  return handle;
}

function _clearImmediate(handle: number) {
  delete tasksByHandle[handle];
}

function run(task: Task) {
  const callback = task.callback;
  const args = task.args;
  callback(...args);
}

function runIfPresent(handle: number) {
  const task = tasksByHandle[handle];
  if (task) {
    try {
      run(task);
    } finally {
      _clearImmediate(handle);
    }
  }
}

export const setImmediate: typeof _setImmediate =
  (window as any)?.setImmediate || _setImmediate;
export const clearImmediate: typeof _clearImmediate =
  (window as any)?.clearImmediate || _clearImmediate;
