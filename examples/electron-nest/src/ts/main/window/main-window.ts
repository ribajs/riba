import { BrowserWindow, BrowserWindowConstructorOptions } from "electron";

export class MainWindow extends BrowserWindow {
  private static instance?: BrowserWindow;

  private static options: BrowserWindowConstructorOptions = {
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false, // is default value after Electron v5
      contextIsolation: true, // protect against prototype pollution
      enableRemoteModule: false, // turn off remote
    },
  };

  private constructor() {
    super(MainWindow.options);

    if (ENV.development) {
      // Open the DevTools.
      this.webContents.openDevTools();
    }
    this.loadURL("http://localhost:3000/index.html");

    MainWindow.instance = this;
  }

  public static getInstance() {
    if (MainWindow.instance) {
      return MainWindow.instance;
    }
    return new MainWindow();
  }
}
