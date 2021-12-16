import {
  AutoInjectable,
  Inject,
} from "https://deno.land/x/alosaur@v0.35.1/mod.ts";
import type { FullThemeConfig } from "./types/index.ts";
import { SsrService as Ssr } from "../deno-ssr/mod.ts";
import { resolve } from "https://deno.land/std@0.117.0/path/mod.ts";

@AutoInjectable()
export class SsrService {
  private ssr: Ssr;

  getSharedContext: Ssr["getSharedContext"];
  // render: Ssr["render"];
  renderComponent: Ssr["renderComponent"];

  constructor(@Inject("theme") readonly theme: FullThemeConfig) {
    if (!theme) {
      throw new Error("Theme config not defined!");
    }
    this.ssr = new Ssr({
      defaultRootTag: theme.ssr?.rootTag,
      defaultTemplateEngine: theme.viewEngine,
      defaultTemplateFile: theme.ssr?.template,
      sourceFileDir: resolve(theme.assetsDir, "ssr"),
      templateDir: theme.viewsDir,
    });
    this.getSharedContext = this.ssr.getSharedContext.bind(this.ssr);
    // this.render = this.ssr.render.bind(this.ssr);
    this.renderComponent = this.ssr.renderComponent.bind(this.ssr);
  }
}
