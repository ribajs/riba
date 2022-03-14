import { HistoryManager } from "./index.js";

declare global {
  interface Window {
    HistoryManager: typeof HistoryManager;
  }
}

window.HistoryManager = HistoryManager;

export { HistoryManager };
export default HistoryManager;
