import { Notification } from "./notification";
import { ModalService, Config } from "../services/modal.service";

export interface Button {
  /**
   * The text displayed in the button.
   */
  label: string;

  /**
   * Method in the scope wich should be called when the button is clicked
   */
  action?: string;

  /**
   * Bootstrap button class e.g. btn-primary, btn-secondary, btn-success, btn-outline-primary, btn-outline-secondary, btn-lg and so on...
   */
  class?: string;
}

export class Modal extends Notification implements Config {
  message: string;
  iconUrl?: string;

  focus?: boolean;
  keyboard?: boolean;
  backdrop?: boolean | "static";
  show?: boolean;

  buttons: Button[] = [];

  modalService?: ModalService;
  contextualClass?: string;

  constructor({
    title,
    message,
    iconUrl,

    focus,
    keyboard,
    backdrop,
    show,

    buttons,

    modalService,
    contextualClass,
    channel,
    $event,
    $context,
  }: {
    title?: string;
    message: string;
    iconUrl?: string;

    focus?: boolean;
    keyboard?: boolean;
    backdrop?: boolean | "static";
    show?: boolean;

    buttons?: Button[];

    modalService?: ModalService;
    contextualClass?: string;
    channel?: string;
    $event?: CustomEvent;
    $context?: any;
  }) {
    super("modal", title);
    this.message = message;
    this.iconUrl = iconUrl;

    this.focus = focus;
    this.keyboard = keyboard;
    this.backdrop = backdrop;
    this.show = show;

    this.buttons = buttons || [];

    this.modalService = modalService;
    this.contextualClass = contextualClass;
    this.channel = channel;
    this.$event = $event;
    this.$context = $context;
  }
}
