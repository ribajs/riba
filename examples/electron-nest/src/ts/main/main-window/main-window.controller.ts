import { Controller } from "@nestjs/common";
import { MainWindow } from "./main-window";

@Controller("main-window")
export class MainWindowController {
  constructor(private readonly mainWin: MainWindow) {}
}
