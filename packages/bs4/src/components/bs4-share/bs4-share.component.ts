import { Component } from "@ribajs/core";
import { getUrl } from "@ribajs/utils/src/url";
import template from "./bs4-share.component.html";
import labelTemplate from "./bs4-share.label.html";
import { ShareItem, ShareUrlType } from "../../interfaces";
import { DropdownService } from "@ribajs/bs4";
import { hasChildNodesTrim } from "@ribajs/utils/src/dom";

export interface Scope {
  type: ShareUrlType;
  title: string;
  text: string;
  /** Page url to share */
  url: string;
  label: string;
  labelTemplate: string;

  /** true if the browser runs on Android */
  isAndroid: boolean;
  /** true if the browser runs on iOS */
  isIos: boolean;
  /** true if the browser runs on a desktop computer */
  isDesktop: boolean;
  /** true if the browser supports native share */
  isNative: boolean;
  dropdownId: string;
  /**
   * Object with share urls like whatsapp, telegram, instagram etc used if the native share is noit available
   * Only used if the browser has not an native share support like on android and iOS
   * */
  shareItems: ShareItem[];

  dropdownDirection: "up" | "down" | "right" | "left";

  // Methods
  shareOnService: Bs4ShareComponent["shareOnService"];
  share: Bs4ShareComponent["share"];
}

export interface NavigatorShareParam {
  url: string;
  text: string;
  title: string;
}

declare global {
  // tslint:disable: interface-name
  interface Navigator {
    share: (data?: ShareData) => Promise<void>;
  }
}

/**
 * Component to share the a link
 * Similar projects wich are can share stuff:
 *  * https://github.com/nimiq/web-share-shim
 *  * http://webintents.org/
 *  * http://chriswren.github.io/native-social-interactions/
 *  * https://www.sharethis.com/platform/share-buttons/
 *  * https://github.com/dimsemenov/PhotoSwipe/blob/master/src/js/ui/photoswipe-ui-default.js
 *
 */
export class Bs4ShareComponent extends Component {
  public static tagName = "bs4-share";

  public _debug = false;

  static get observedAttributes() {
    return [
      "type",
      "title",
      "text",
      "url",
      "media-url",
      "label",
      "dropdown-direction",
    ];
  }

  protected dropdown?: DropdownService;

  // Count of Bs4ShareComponent components
  static count = 0;

  protected scope: Scope;

  constructor(element?: HTMLElement) {
    super(element);
    this.scope = this.getScopeDefaults();
    this.debug("constructor", this.scope);
    Bs4ShareComponent.count++;
    this.onExternalOpenEvent = this.onExternalOpenEvent.bind(this);
    this.onExternalCloseEvent = this.onExternalCloseEvent.bind(this);
  }

  protected getDefaultShareServices() {
    const newLine = "%0A";
    const shareItems: ShareItem[] = [
      {
        id: "facebook",
        label: "Facebook",
        // It is not possible to add a message on facebook sharer.php but with the Dialog API, see https://developers.facebook.com/docs/javascript/reference/FB.ui
        urlTemplate: "https://www.facebook.com/sharer/sharer.php?u={{url}}",
        mediaUrlTemplate:
          "https://www.facebook.com/sharer/sharer.php?u={{media_url}}",
        type: "popup",
        url: "",
        availableFor: ["page", "image", "video"],
      },
      {
        id: "twitter",
        label: "Twitter",
        urlTemplate:
          "https://twitter.com/intent/tweet?text={{text}}&url={{url}}",
        mediaUrlTemplate: `https://twitter.com/intent/tweet?text={{text}}&url={{media_url}}${newLine}({{url}})`,
        url: "",
        availableFor: ["page", "image", "video"],
      },
      {
        id: "pinterest",
        label: "Pinterest",
        urlTemplate:
          "http://www.pinterest.com/pin/create/button/" +
          "?url={{url}}&media={{media_url}}&description={{text}}",
        type: "popup",
        url: "",

        availableFor: ["image", "video"],
      },
      {
        id: "whatsapp",
        label: "WhatsApp",
        urlTemplate: `https://api.whatsapp.com/send?text={{text}}${newLine}${newLine}{{url}}`,
        mediaUrlTemplate: `https://api.whatsapp.com/send?text={{text}}${newLine}${newLine}{{media_url}}${newLine}({{url}})`,
        type: "popup",
        url: "",
        availableFor: ["page", "image", "video"],
      },
      {
        id: "telegram",
        label: "Telegram",
        urlTemplate: `https://telegram.me/share/url?url={{media_url}}&text={{text}}`,
        mediaUrlTemplate: `https://telegram.me/share/url?url={{media_url}}&text={{text}}${newLine}({{url}})`,
        type: "popup",
        url: "",
        availableFor: ["page", "image", "video"],
      },
      {
        id: "email",
        label: "Email",
        urlTemplate: `mailto:?subject={{title}}&body={{text}}${newLine}${newLine}{{url}}`,
        mediaUrlTemplate: `mailto:?subject={{title}}&body={{text}}${newLine}${newLine}{{media_url}}${newLine}({{url}})`,
        type: "href",
        url: "",
        availableFor: ["page", "image", "video"],
      },
      // {
      //   id: "sms",
      //   label: "SMS",
      //   urlTemplate: "sms:?body={{text}}",
      //   type: 'href',
      //   url: "",
      //   canPassUrl: false,
      //   availableFor: ['page', 'image', 'video'],
      // },
      {
        id: "download",
        label: "Download image",
        urlTemplate: "{{raw_media_url}}",
        type: "download",
        url: "",
        availableFor: ["image", "video"],
      },
    ];
    return shareItems;
  }

  protected isIos() {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i) !== null;
  }

  protected isAndroid() {
    return navigator.userAgent.match(/Android/i) !== null;
  }

  protected browserSupportsNativeShare() {
    return typeof navigator.share === "function";
  }

  protected getScopeDefaults(): Scope {
    const scope: Scope = {
      type: "page",
      title: document.title,
      text: "Look at this! 👀🤩",
      url: window.location.href,
      label: "Share",
      labelTemplate,
      isAndroid: this.isAndroid(),
      isIos: this.isIos(),
      isDesktop: false,
      isNative: this.browserSupportsNativeShare(),
      dropdownId: "dropdownShare" + Bs4ShareComponent.count,
      shareItems: this.getDefaultShareServices(),
      dropdownDirection: "down",
      // Methods
      share: this.share,
      shareOnService: this.shareOnService,
    };

    // on those two support "mobile deep links", so HTTP based fallback for all others.
    scope.isDesktop = !scope.isIos && !scope.isAndroid;

    return scope;
  }

  protected onExternalOpenEvent() {
    this.dropdown?.show();
  }

  protected onExternalCloseEvent() {
    this.dropdown?.close();
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(Bs4ShareComponent.observedAttributes);
    this.addEventListeners();
  }

  protected disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListeners();
  }

  protected addEventListeners() {
    this.el.addEventListener("open", this.onExternalOpenEvent);
    this.el.addEventListener("close", this.onExternalCloseEvent);
  }

  protected removeEventListeners() {
    this.el.removeEventListener("open", this.onExternalOpenEvent);
    this.el.removeEventListener("close", this.onExternalOpenEvent);
  }

  protected getURLForShare() {
    if (this.scope.type === "page" && this.scope.url) {
      return getUrl(this.scope.url);
    }
    return window.location.href;
  }

  protected getMediaUrlForShare() {
    if (this.scope.type !== "page" && this.scope.url) {
      return getUrl(this.scope.url);
    }
    return "";
  }

  protected getTextForShare() {
    return this.scope.text;
  }

  /**
   * Currently only used for email
   * @param appendUrl
   */
  protected getTitleForShare() {
    return this.scope.title;
  }

  protected updateShareURLs() {
    for (const shareItem of this.scope.shareItems) {
      const url = this.getURLForShare();
      const mediaUrl = this.getMediaUrlForShare();
      const shareText = this.getTextForShare();
      const shareTitle = this.getTitleForShare();
      let urlTemplate = shareItem.urlTemplate;

      if (this.scope.type !== "page" && shareItem.mediaUrlTemplate) {
        urlTemplate = shareItem.mediaUrlTemplate;
      }

      const shareURL = urlTemplate
        .replace("{{url}}", encodeURIComponent(url))
        .replace("{{url}}", encodeURIComponent(url))
        .replace("{{media_url}}", encodeURIComponent(mediaUrl))
        .replace("{{raw_media_url}}", mediaUrl)
        .replace("{{text}}", encodeURIComponent(shareText))
        .replace("{{title}}", encodeURIComponent(shareTitle));

      shareItem.available = shareItem.availableFor.includes(this.scope.type);
      shareItem.url = shareURL;
    }
  }

  protected initDropdown() {
    const dropDownButtonElement = this.el.querySelector(
      ".dropdown-toggle-share"
    ) as HTMLButtonElement | HTMLAnchorElement;
    if (!dropDownButtonElement) {
      console.warn(
        'Element with selector ".dropdown-toggle-share" not found!',
        this.el
      );
      return;
    }
    this.dropdown = new DropdownService(dropDownButtonElement);
  }

  /**
   * New browser popup with the external site (e.g. Facebook) on you want to share your url
   * @param binding
   * @param event
   * @param controller
   * @param el
   */
  public shareOnService(event: Event, controller: any, el: HTMLAnchorElement) {
    this.debug("Open popup");

    this.dropdown?.close();

    if (!el || !el.href) {
      console.error("No href attribute found");
      return false;
    }

    // We use the default browser anchor href logic for download and href
    if (
      (el.hasAttribute("type") && el.getAttribute("type") === "download") ||
      el.getAttribute("type") === "href"
    ) {
      return true;
    }

    event.preventDefault();
    event.stopPropagation();

    // this.debug('Open popup');

    window.open(
      el.href,
      "Share",
      "scrollbars=yes,resizable=yes,toolbar=no," +
        "location=yes,width=550,height=420,top=100,left=" +
        (window.screen ? Math.round(screen.width / 2 - 275) : 100)
    );

    return false;
  }

  public async share(event: Event): Promise<any> {
    this.debug("share", this.scope);
    event.preventDefault();
    event.stopPropagation();
    if (this.scope.isNative && !this.scope.isDesktop) {
      return navigator
        .share({
          title: this.scope.title,
          text: `${this.scope.text}\r\n\r\n`,
          url: this.scope.url || window.location.href,
        })
        .catch((error: DOMException) => {
          if (error.name === "AbortError") {
            // TODO show flash message
            // this.debug(error.message);
            return;
          }
          console.error(`Error ${error.name}: ${error.message}`, error);
        });
    } else {
      this.updateShareURLs();
      return this.dropdown?.toggle();
    }
  }

  protected async beforeBind() {
    await super.beforeBind();
    // this.debug('beforeBind');
  }

  protected async afterBind() {
    this.initDropdown();
    // this.debug('afterBind', this.scope);
    await super.afterBind();
  }

  protected requiredAttributes() {
    return ["url"];
  }

  protected template() {
    this.debug("template", this.el, hasChildNodesTrim(this.el));
    if (this.el && hasChildNodesTrim(this.el)) {
      // If a child is set, this is a custom label template
      this.scope.labelTemplate = this.el.innerHTML;
      this.debug("Custom label template: ", this.scope.labelTemplate);
    }
    return template;
  }
}
