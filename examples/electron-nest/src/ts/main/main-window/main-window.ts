import { Injectable, Inject } from "@nestjs/common";
import { BrowserWindow, BrowserWindowConstructorOptions } from "electron";
import { Config, Env } from "../../typings";

@Injectable()
export class MainWindow extends BrowserWindow {
  private _port = 0;

  private static options: BrowserWindowConstructorOptions = {
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false, // is default value after Electron v5
      contextIsolation: true, // protect against prototype pollution
      enableRemoteModule: false, // turn off remote
    },
  };

  public set port(port: number) {
    this.loadURL(`http://localhost:${port}/index.html`);
    this._port = port;
  }

  public get port() {
    return this._port;
  }

  constructor(@Inject("ENV") env: Env, @Inject("CONFIG") config: Config) {
    super(MainWindow.options);

    if (ENV.development) {
      // Open the DevTools.
      this.webContents.openDevTools();
    }

    this.port = config.port;
  }
}
