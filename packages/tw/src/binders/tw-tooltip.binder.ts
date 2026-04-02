import { Binder } from "@ribajs/core";
import { TooltipService } from "../services/tooltip.service.js";
import type { Placement } from "@floating-ui/dom";

export interface TwTooltipOptions {
  content?: string;
  placement?: Placement;
  showDelay?: number;
  hideDelay?: number;
}

/**
 * Initializes a tooltip on an element using Floating UI for positioning.
 *
 * Bind a string to set the tooltip content, or an options object for
 * more control (placement, delays, etc.).
 */
export class TooltipBinder extends Binder<
  string | TwTooltipOptions,
  HTMLElement
> {
  static key = "tw-tooltip";

  private tooltipService?: TooltipService;

  bind(el: HTMLElement) {
    // Service will be created in routine when content is available
  }

  routine(el: HTMLElement, optionsOrContent: string | TwTooltipOptions) {
    let options: TwTooltipOptions = {};

    if (typeof optionsOrContent === "string") {
      options.content = optionsOrContent;
    } else if (typeof optionsOrContent === "object") {
      options = { ...optionsOrContent };
    }

    if (this.tooltipService) {
      // Update content if tooltip already exists
      if (options.content !== undefined) {
        this.tooltipService.content = options.content;
      }
      return;
    }

    this.tooltipService = new TooltipService(el, {
      content: options.content,
      placement: options.placement || "top",
      showDelay: options.showDelay,
      hideDelay: options.hideDelay,
    });
  }

  unbind() {
    if (this.tooltipService) {
      this.tooltipService.dispose();
      this.tooltipService = undefined;
    }
  }
}
