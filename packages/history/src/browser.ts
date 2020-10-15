import { HistoryManager } from "./index";

declare global {
  interface Window {
    HistoryManager: typeof HistoryManager;
  }
}

window.HistoryManager = HistoryManager;

export { HistoryManager };
export default HistoryManager;
