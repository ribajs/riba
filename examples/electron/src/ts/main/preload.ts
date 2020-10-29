import { contextBridge, ipcRenderer } from "electron";

const validUrls = ["main/hello", "main/versions"];

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
// See https://stackoverflow.com/a/59814127/1465919
contextBridge.exposeInMainWorld("app", {
  request: (channel: string, data: any) => {
    console.debug("[preload] request", channel, data);
    // whitelist urls / channels
    if (validUrls.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },
  response: (channel: string, cb: (...args: any) => void) => {
    console.debug("[preload] response", channel);
    if (validUrls.includes(channel)) {
      // Deliberately strip event as it includes `sender`
      ipcRenderer.on(channel, (event, ...args) => cb(...args));
    }
  },
});
