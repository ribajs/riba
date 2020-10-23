// Modules to control application life and create native browser window
import { app, BrowserWindow, ipcMain } from "electron";
import * as path from "path";
import fs from "fs";

let mainWindow: BrowserWindow;

function createWindow() {
  const preloadPath = path.join(__dirname, "preload.bundle.js");
  console.debug("preloadPath", preloadPath);
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false, // is default value after Electron v5
      contextIsolation: true, // protect against prototype pollution
      enableRemoteModule: false, // turn off remote
      // preload: path.join(__dirname, "preload.bundle.js"),
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile("index.html");

  // Open the DevTools.
  mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.


// https://stackoverflow.com/a/59814127/1465919
ipcMain.on("toMain", (event, args) => {
  // fs.readFile("path/to/file", (error, data) => {
    // Do something with file contents

    // Send result back to renderer process
    mainWindow.webContents.send("fromMain", {test: 'test'});
  // });
});