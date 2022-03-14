import { Notification, ModalNotificationButton } from "../types/index.js";
import { Modal } from "../services/modal";

export class ModalNotification extends Notification {
  message: string;
  iconUrl?: string;

  focus: boolean;
  keyboard: boolean;
  backdrop: boolean | "static";

  buttons: ModalNotificationButton[] = [];

  modalService?: Modal;
  contextualClass?: string;

  constructor({
    title,
    message,
    iconUrl,

    focus,
    keyboard,
    backdrop,

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

    buttons?: ModalNotificationButton[];

    modalService?: Modal;
    contextualClass?: string;
    channel?: string;
    $event?: CustomEvent;
    $context?: any;
  }) {
    super("modal", title);
    this.message = message;
    this.iconUrl = iconUrl;

    this.focus = focus || false;
    this.keyboard = keyboard || true;
    this.backdrop = backdrop || true;

    this.buttons = buttons || [];

    this.modalService = modalService;
    this.contextualClass = contextualClass;
    this.channel = channel;
    this.$event = $event;
    this.$context = $context;
  }
}
