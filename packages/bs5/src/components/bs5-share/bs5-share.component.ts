import { Component, TemplateFunction } from "@ribajs/core/src/index.js";
import { getUrl } from "@ribajs/utils/src/url";
import template from "./bs5-share.component.html";
import labelTemplate from "./bs5-share.label.html";
import { ShareItem, ShareUrlType } from "../../types/index.js";
import { Dropdown } from "@ribajs/bs5";
import {
  hasChildNodesTrim,
  copyTextToClipboard,
  stripHtml,
} from "@ribajs/utils/src/index.js";

export interface Scope {
  type: ShareUrlType;
  title: string;
  text: string;
  /** Page url to share */
  url?: string;
  label: string;
  labelTemplate: string;
  filename?: string;

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
   * Object with share urls like WhatsApp, Telegram, instagram etc used if the native share is not available
   * Only used if the browser has not an native share support like on android and iOS
   * */
  shareItems: ShareItem[];

  dropdownDirection: "up" | "down" | "start" | "end";
  dropdownAlignment: "end" | "start" | "auto";

  labelFacebook: string;
  labelTwitter: string;
  labelPinterest: string;
  labelWhatsapp: string;
  labelTelegram: string;
  labelEmail: string;
  labelDownload: string;
  labelClipboard: string;

  // Methods
  shareOnService: Bs5ShareComponent["shareOnService"];
  share: Bs5ShareComponent["share"];
  getFilename: Bs5ShareComponent["getFilename"];
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
 * Similar projects which are can share stuff:
 *  * https://github.com/nimiq/web-share-shim
 *  * http://webintents.org/
 *  * http://chriswren.github.io/native-social-interactions/
 *  * https://github.com/dimsemenov/PhotoSwipe/blob/master/src/js/ui/photoswipe-ui-default.js
 *
 */
export class Bs5ShareComponent extends Component {
  public static tagName = "bs5-share";

  public _debug = false;

  static get observedAttributes(): string[] {
    return [
      "type",
      "title",
      "text",
      "url",
      "media-url",
      "filename",
      "label",
      "dropdown-direction",
      "dropdown-alignment",
      "label-facebook",
      "label-twitter",
      "label-pinterest",
      "label-whatsapp",
      "label-telegram",
      "label-email",
      "label-download",
      "label-clipboard",
    ];
  }

  protected dropdown?: Dropdown;

  // Count of Bs5ShareComponent components
  static count = 0;

  public scope: Scope;

  constructor() {
    super();
    this.scope = this.getScopeDefaults();
    // this.debug("constructor", this.scope);
    Bs5ShareComponent.count++;
    this.onExternalOpenEvent = this.onExternalOpenEvent.bind(this);
    this.onExternalCloseEvent = this.onExternalCloseEvent.bind(this);
  }

  public getFilename(item: ShareItem) {
    if (item.filename) {
      return item.filename;
    }
    const url = this.getMediaUrlForShare();
    const filename = url.split("/").pop();
    return filename;
  }

  protected getDefaultShareServices() {
    const newLine = "%0A";
    const shareItems: ShareItem[] = [
      {
        id: "facebook",
        label: this.scope.labelFacebook,
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
        label: this.scope.labelTwitter,
        urlTemplate:
          "https://twitter.com/intent/tweet?text={{text}}&url={{url}}",
        mediaUrlTemplate: `https://twitter.com/intent/tweet?text={{text}}&url={{media_url}}${newLine}({{url}})`,
        url: "",
        availableFor: ["page", "image", "video"],
      },
      {
        id: "pinterest",
        label: this.scope.labelPinterest,
        urlTemplate:
          "http://www.pinterest.com/pin/create/button/" +
          "?url={{url}}&media={{media_url}}&description={{text}}",
        type: "popup",
        url: "",

        availableFor: ["image", "video"],
      },
      {
        id: "whatsapp",
        label: this.scope.labelWhatsapp,
        urlTemplate: `https://api.whatsapp.com/send?text={{text}}${newLine}${newLine}{{url}}`,
        mediaUrlTemplate: `https://api.whatsapp.com/send?text={{text}}${newLine}${newLine}{{media_url}}${newLine}({{url}})`,
        type: "popup",
        url: "",
        availableFor: ["page", "image", "video"],
      },
      {
        id: "telegram",
        label: this.scope.labelTelegram,
        urlTemplate: `https://telegram.me/share/url?url={{url}}&text={{text}}`,
        mediaUrlTemplate: `https://telegram.me/share/url?url={{media_url}}&text={{text}}${newLine}({{url}})`,
        type: "popup",
        url: "",
        availableFor: ["page", "image", "video"],
      },
      {
        id: "email",
        label: this.scope.labelEmail,
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
        label: this.scope.labelDownload,
        urlTemplate: "{{raw_media_url}}",
        type: "download",
        url: "",
        availableFor: ["image", "video"],
        filename: this.scope.filename,
      },
      {
        id: "clipboard",
        label: this.scope.labelClipboard,
        urlTemplate: "{{url}}",
        mediaUrlTemplate: `{{media_url}}`,
        type: "clipboard",
        url: "",
        availableFor: ["page", "image", "video"],
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
      url: undefined,
      label: "Share",
      labelTemplate,
      isAndroid: this.isAndroid(),
      isIos: this.isIos(),
      isDesktop: false,
      isNative: this.browserSupportsNativeShare(),
      dropdownId: "dropdownShare" + Bs5ShareComponent.count,
      shareItems: [],
      dropdownDirection: "down",
      dropdownAlignment: "auto",
      // Service labels
      labelFacebook: "Facebook",
      labelTwitter: "Twitter",
      labelPinterest: "Pinterest",
      labelWhatsapp: "Whatsapp",
      labelTelegram: "Telegram",
      labelEmail: "Email",
      labelDownload: "Download",
      labelClipboard: "Copy to clipboard",
      // Methods
      share: this.share,
      shareOnService: this.shareOnService,
      getFilename: this.getFilename,
    };

    // on those two support "mobile deep links", so HTTP based fallback for all others.
    scope.isDesktop = !scope.isIos && !scope.isAndroid;

    return scope;
  }

  protected onExternalOpenEvent() {
    this.dropdown?.show();
  }

  protected onExternalCloseEvent() {
    this.dropdown?.hide();
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(Bs5ShareComponent.observedAttributes);
    this.addEventListeners();
  }

  protected disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListeners();
  }

  protected addEventListeners() {
    this.addEventListener("open", this.onExternalOpenEvent);
    this.addEventListener("btn-close", this.onExternalCloseEvent);
  }

  protected removeEventListeners() {
    this.removeEventListener("open", this.onExternalOpenEvent);
    this.removeEventListener("btn-close", this.onExternalOpenEvent);
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
    return stripHtml(this.scope.text);
  }

  /**
   * Currently only used for email
   * @param appendUrl
   */
  protected getTitleForShare() {
    return stripHtml(this.scope.title);
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

      const encode = shareItem.type === "clipboard" ? false : true;

      const shareURL = urlTemplate
        .replace("{{url}}", encode ? encodeURIComponent(url) : url)
        .replace(
          "{{media_url}}",
          encode ? encodeURIComponent(mediaUrl) : mediaUrl
        )
        .replace("{{raw_media_url}}", mediaUrl)
        .replace("{{text}}", encode ? encodeURIComponent(shareText) : shareText)
        .replace(
          "{{title}}",
          encode ? encodeURIComponent(shareTitle) : shareTitle
        );

      shareItem.available = shareItem.availableFor.includes(this.scope.type);
      shareItem.url = shareURL;
    }
  }

  protected initDropdown() {
    const dropDownButtonElement = this.querySelector(
      ".dropdown-toggle-share"
    ) as HTMLButtonElement | HTMLAnchorElement;
    if (!dropDownButtonElement) {
      console.warn(
        'Element with selector ".dropdown-toggle-share" not found!',
        this
      );
      return;
    }
    this.dropdown = new Dropdown(dropDownButtonElement);
  }

  /**
   * New browser popup with the external site (e.g. Facebook) on you want to share your url
   * @param binding
   * @param event
   * @param controller
   * @param el
   */
  public async shareOnService(item: ShareItem, event: Event) {
    this.dropdown?.hide();

    if (item.type === "clipboard") {
      event.preventDefault();
      event.stopPropagation();
      await copyTextToClipboard(item.url);
      return false;
    }

    // We use the default browser anchor href logic for download and href
    if (item.type === "download") {
      return true;
    }

    event.preventDefault();
    event.stopPropagation();

    window.open(
      item.url,
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
      try {
        await navigator.share({
          title: this.scope.title,
          text: `${this.scope.text}\r\n\r\n`,
          url: this.scope.url || window.location.href,
        });
      } catch (error: any) {
        if (error.name === "AbortError") {
          // TODO show flash message
          // this.debug(error.message);
          return;
        }
        console.error(`Error ${error.name}: ${error.message}`, error);
      }
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
    this.debug("afterBind", this.scope);
    this.scope.shareItems = this.getDefaultShareServices();
    await super.afterBind();
  }

  protected requiredAttributes(): string[] {
    return [];
  }

  protected template(): ReturnType<TemplateFunction> {
    if (this && hasChildNodesTrim(this)) {
      this.scope.labelTemplate = this.innerHTML;
    }
    return template;
  }
}
