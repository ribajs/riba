import { Notification } from "./notification";
import ModalService from "../services/modal.service";

export class Modal extends Notification {
  message: string;
  iconUrl?: string;
  delay?: number;
  autoHide?: boolean;
  animation?: boolean;
  modalService?: ModalService;
  contextualClass?: string;

  constructor({
    title,
    message,
    iconUrl,
    delay,
    autoHide,
    animation,
    modalService,
    contextualClass,
    channel,
    $event,
    $context,
  }: {
    title?: string;
    message: string;
    iconUrl?: string;
    delay?: number;
    autoHide?: boolean;
    animation?: boolean;
    modalService?: ModalService;
    contextualClass?: string;
    channel?: string;
    $event?: CustomEvent;
    $context?: any;
  }) {
    super("modal", title);
    this.message = message;
    this.iconUrl = iconUrl;
    this.delay = delay;
    this.autoHide = autoHide;
    this.animation = animation;
    this.modalService = modalService;
    this.contextualClass = contextualClass;
    this.channel = channel;
    this.$event = $event;
    this.$context = $context;
  }
}
