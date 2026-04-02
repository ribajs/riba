import { Component, TemplateFunction, ScopeBase } from "@ribajs/core";
import { hasChildNodesTrim } from "@ribajs/utils/src/dom.js";
import { stripHtml } from "@ribajs/utils/src/type.js";
import { getUrl } from "@ribajs/utils/src/url.js";
import template from "./tw-share.component.html?raw";

export interface ShareItem {
  id: string;
  label: string;
  urlTemplate: string;
  mediaUrlTemplate?: string;
  type: "popup" | "href" | "download" | "clipboard";
  url: string;
  available?: boolean;
  availableFor: string[];
  filename?: string;
}

export type ShareUrlType = "page" | "image" | "video";

export interface Scope extends ScopeBase {
  type: ShareUrlType;
  title: string;
  text: string;
  /** Page URL to share */
  url?: string;
  /** Comma-separated platform list or "all" */
  platforms: string;

  /** true if the browser supports native share */
  isNative: boolean;
  /** Whether the dropdown menu is currently open */
  menuOpen: boolean;

  /** Share items for fallback dropdown */
  shareItems: ShareItem[];

  // Methods
  share: TwShareComponent["share"];
  shareOnService: TwShareComponent["shareOnService"];
  toggleMenu: TwShareComponent["toggleMenu"];
}

export class TwShareComponent extends Component {
  public static tagName = "tw-share";

  protected autobind = true;
  public _debug = false;

  static get observedAttributes(): string[] {
    return ["type", "title", "text", "url", "platforms"];
  }

  public scope: Scope = {
    type: "page",
    title: document.title,
    text: "",
    url: undefined,
    platforms: "all",

    isNative: typeof navigator.share === "function",
    menuOpen: false,

    shareItems: [],

    share: this.share.bind(this),
    shareOnService: this.shareOnService.bind(this),
    toggleMenu: this.toggleMenu.bind(this),
  };

  constructor() {
    super();
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(TwShareComponent.observedAttributes);
  }

  protected requiredAttributes(): string[] {
    return [];
  }

  protected async afterBind() {
    await super.afterBind();
    this.scope.shareItems = this.buildShareItems();
  }

  protected buildShareItems(): ShareItem[] {
    const newLine = "%0A";
    const all: ShareItem[] = [
      {
        id: "facebook",
        label: "Facebook",
        urlTemplate: "https://www.facebook.com/sharer/sharer.php?u={{url}}",
        type: "popup",
        url: "",
        availableFor: ["page", "image", "video"],
      },
      {
        id: "twitter",
        label: "Twitter / X",
        urlTemplate:
          "https://twitter.com/intent/tweet?text={{text}}&url={{url}}",
        type: "popup",
        url: "",
        availableFor: ["page", "image", "video"],
      },
      {
        id: "whatsapp",
        label: "WhatsApp",
        urlTemplate: `https://api.whatsapp.com/send?text={{text}}${newLine}${newLine}{{url}}`,
        type: "popup",
        url: "",
        availableFor: ["page", "image", "video"],
      },
      {
        id: "telegram",
        label: "Telegram",
        urlTemplate:
          "https://telegram.me/share/url?url={{url}}&text={{text}}",
        type: "popup",
        url: "",
        availableFor: ["page", "image", "video"],
      },
      {
        id: "email",
        label: "Email",
        urlTemplate: `mailto:?subject={{title}}&body={{text}}${newLine}${newLine}{{url}}`,
        type: "href",
        url: "",
        availableFor: ["page", "image", "video"],
      },
      {
        id: "clipboard",
        label: "Copy link",
        urlTemplate: "{{url}}",
        type: "clipboard",
        url: "",
        availableFor: ["page", "image", "video"],
      },
    ];

    const platforms = this.scope.platforms.toLowerCase().trim();
    if (platforms === "all") {
      return all;
    }
    const allowed = platforms.split(",").map((p) => p.trim());
    return all.filter((item) => allowed.includes(item.id));
  }

  protected getURLForShare(): string {
    if (this.scope.url) {
      return getUrl(this.scope.url);
    }
    return window.location.href;
  }

  protected getTextForShare(): string {
    return stripHtml(this.scope.text);
  }

  protected getTitleForShare(): string {
    return stripHtml(this.scope.title);
  }

  protected updateShareURLs() {
    const url = this.getURLForShare();
    const text = this.getTextForShare();
    const title = this.getTitleForShare();

    for (const item of this.scope.shareItems) {
      const encode = item.type !== "clipboard";
      item.available = item.availableFor.includes(this.scope.type);
      item.url = item.urlTemplate
        .replace("{{url}}", encode ? encodeURIComponent(url) : url)
        .replace("{{text}}", encode ? encodeURIComponent(text) : text)
        .replace("{{title}}", encode ? encodeURIComponent(title) : title);
    }
  }

  /**
   * Trigger the native Web Share API or open the fallback dropdown.
   */
  public async share(event: Event) {
    event.preventDefault();
    event.stopPropagation();

    if (this.scope.isNative) {
      try {
        await navigator.share({
          title: this.scope.title,
          text: this.scope.text,
          url: this.scope.url || window.location.href,
        });
        return;
      } catch (error: any) {
        if (error.name === "AbortError") {
          return;
        }
        // Fallback to menu if native share fails
      }
    }

    this.updateShareURLs();
    this.toggleMenu();
  }

  /**
   * Share via a specific service from the dropdown.
   */
  public async shareOnService(item: ShareItem, event: Event) {
    this.scope.menuOpen = false;

    if (item.type === "clipboard") {
      event.preventDefault();
      event.stopPropagation();
      try {
        await navigator.clipboard.writeText(item.url);
      } catch (err) {
        console.warn("Failed to copy to clipboard", err);
      }
      return false;
    }

    if (item.type === "download") {
      return true;
    }

    if (item.type === "href") {
      // Let the default anchor behavior handle mailto: etc.
      return true;
    }

    event.preventDefault();
    event.stopPropagation();

    window.open(
      item.url,
      "Share",
      "scrollbars=yes,resizable=yes,toolbar=no," +
        "location=yes,width=550,height=420,top=100,left=" +
        (window.screen ? Math.round(screen.width / 2 - 275) : 100),
    );

    return false;
  }

  public toggleMenu() {
    this.scope.menuOpen = !this.scope.menuOpen;
  }

  protected disconnectedCallback() {
    super.disconnectedCallback();
  }

  protected template(): ReturnType<TemplateFunction> {
    if (hasChildNodesTrim(this)) {
      return null;
    }
    return template;
  }
}
