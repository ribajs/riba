import { Controller, Get, Res } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("versions")
  async versions(@Res() res) {
    const versions = await this.appService.getVersions();
    return res.json(versions);
  }
}
