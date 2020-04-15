import { Component } from "@ribajs/core";
import template from "./bs4-share.component.html";
import labelTemplate from "./bs4-share.label.html";
import { ShareItem } from "../../interfaces";
import { DropdownService } from "@ribajs/bs4";

export interface Scope {
  title: string;
  text: string;
  /** Page url to share */
  url: string;
  /** Url if you wish to share images, videos, etc  TODO implement this */
  imediaUrl: "",
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
  /** 
   * Object with share urls like whatsapp, telegram, instagram etc used if the native share is noit available
   * Only used if the browser has not an native share support like on android and iOS
   * */
  shareItems: ShareItem[];

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
    share: (data: NavigatorShareParam) => Promise<any>;
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

  static get observedAttributes() {
    return ["title", "text", "text-i18n", "url", "media-url", "label", "label-i18n"];
  }

  protected dropdown?: DropdownService;


  protected scope: Scope = {
    title: document.title,
    text: "Look at this! 🤩", // 👀
    url: window.location.href,
    /** TODO */
    imediaUrl: "",
    label: "Share",
    labelTemplate: labelTemplate,
    isAndroid: navigator.userAgent.match(/Android/i) !== null,
    isIos: navigator.userAgent.match(/iPhone|iPad|iPod/i) !== null,
    isDesktop: false,
    isNative: typeof navigator.share === "function",
    shareItems: [
      {
        id: "facebook",
        label: "Share on Facebook",
        urlTemplate: "https://www.facebook.com/sharer/sharer.php?u={{url}}",
        type: 'popup',
        url: "",
        enabled: true,
      },
      {
        id: "twitter",
        label: "Tweet",
        urlTemplate:
          "https://twitter.com/intent/tweet?text={{text}}&url={{url}}",
        url: "",
        enabled: true,
      },
      {
        id: "pinterest",
        label: "Pin it",
        urlTemplate:
          "http://www.pinterest.com/pin/create/button/" +
          "?url={{url}}&media={{image_url}}&description={{text}}",
          type: 'popup',
        url: "",
        enabled: true,
      },
      {
        id: "whatsapp",
        label: "WhatsApp",
        urlTemplate: "https://api.whatsapp.com/send?text={{text}}",
        type: 'popup',
        url: "",
        enabled: true,
      },
      {
        id: "telegram",
        label: "Telegram",
        urlTemplate: "https://telegram.me/share/url?url={{url}}&text={{text}}",
        type: 'popup',
        url: "",
        enabled: true,
      },
      {
        id: "email",
        label: "Email",
        urlTemplate: "mailto:?subject={{title}}&body={{text}}",
        type: 'href',
        url: "",
        enabled: false,
      },
      {
        id: "sms",
        label: "SMS",
        urlTemplate: "sms:?body={{text}}",
        type: 'href',
        url: "",
        enabled: false,
      },
      {
        id: "download",
        label: "Download image",
        urlTemplate: "{{raw_image_url}}",
        type: 'download',
        url: "",
        // TODO disabled until imediaUrl is impementated
        enabled: false,
      },
    ],
    // Methods
    share: this.share,
    shareOnService: this.shareOnService,
  };

  constructor(element?: HTMLElement) {
    super(element);
    // console.debug('constructor', this);
    this.init(Bs4ShareComponent.observedAttributes);
    this.scope.isDesktop = !(this.scope.isIos || this.scope.isAndroid); // on those two support "mobile deep links", so HTTP based fallback for all others.
    this.addEventListeners();
  }

  protected onExternalOpenEvent() {
    this.dropdown?.open();
  }

  protected onExternalCloseEvent() {
    this.dropdown?.close();
  }

  protected disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListeners();
  }

  protected addEventListeners() {
    this.el.addEventListener('open', this.onExternalOpenEvent.bind(this));
    this.el.addEventListener('close', this.onExternalCloseEvent.bind(this));
  }

  protected removeEventListeners() {
    this.el.removeEventListener('open', this.onExternalOpenEvent.bind(this));
    this.el.removeEventListener('close', this.onExternalOpenEvent.bind(this));
  }

  protected getURLToShare() {
    return encodeURIComponent(this.scope.url);
  }

  protected getPageURLForShare() {
    return window.location.href;
  }

  protected getTextForShare() {
    // return encodeURIComponent(`${this.scope.text}\n\n${this.scope.url}`);
    return `${this.scope.text}\n\n${this.scope.url}`;
  }


  protected updateShareURLs() {
    let shareURL = "",
      imageUrl = "",
      pageUrl = "",
      shareText = "";

    for (let i = 0; i < this.scope.shareItems.length; i++) {
      imageUrl = this.getURLToShare();
      pageUrl = this.getPageURLForShare();
      shareText = this.getTextForShare();
      shareURL = this.scope.shareItems[i].urlTemplate
        .replace("{{url}}", encodeURIComponent(pageUrl))
        .replace("{{image_url}}", encodeURIComponent(imageUrl))
        .replace("{{raw_image_url}}", imageUrl)
        .replace("{{text}}", encodeURIComponent(shareText));

      this.scope.shareItems[i].url = shareURL;
    }
  }

  protected initDropdown() {
    const dropDownButtonElement = this.el.querySelector(
      ".dropdown-toggle-share"
    ) as HTMLButtonElement | HTMLAnchorElement;
    if (!dropDownButtonElement) {
      console.warn('Element with selector ".dropdown-toggle-share" not found!');
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
  public shareOnService(
    binding: any,
    event: Event,
    controller: any,
    el: HTMLAnchorElement
  ) {
    // console.debug('Open popup');

    this.dropdown?.close();

    if (!el || !el.href) {
      console.error("No href attribute found");
      return false;
    }

    // We use the default browser anchor href logic for download and href
    if (el.hasAttribute("type") && el.getAttribute("type") === "download" || el.getAttribute("type") === "href") {
      return true;
    }

    event.preventDefault();
    event.stopPropagation();

    // console.debug('Open popup');

    window.open(
      el.href,
      "Share",
      "scrollbars=yes,resizable=yes,toolbar=no," +
        "location=yes,width=550,height=420,top=100,left=" +
        (window.screen ? Math.round(screen.width / 2 - 275) : 100)
    );

    return false;
  }

  public async share(context: any, event: Event): Promise<any> {
    // console.debug('share', this.scope);
    event.preventDefault();
    event.stopPropagation();
    if (this.scope.isNative) {
      return navigator
        .share({
          title: this.scope.title,
          text: `${this.scope.text}\r\n\r\n`,
          url: this.scope.url || window.location.href,
        })
        .catch((error: DOMException) => {
          if (error.name === "AbortError") {
            // TODO show flash message
            // console.debug(error.message);
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
    // console.debug('beforeBind');
  }

  protected async afterBind() {
    await super.afterBind();
    this.initDropdown();
    // console.debug('afterBind', this.scope);
  }

  protected requiredAttributes() {
    return ["title", "text", "url", "label"];
  }

  protected template() {
    if (this.el && this.el.hasChildNodes()) {
      // If a child is set, this is a custom label template
      this.scope.labelTemplate = this.el.innerHTML;
      // console.debug('Custom label template: ', this.el.innerHTML);
    }
    return template;
  }
}
