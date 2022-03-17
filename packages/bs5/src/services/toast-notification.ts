import { Toast } from "./index.js";
import { Notification } from "../types/notification.js";

export class ToastNotification extends Notification {
  message: string;
  iconUrl?: string;
  delay?: number;
  autoHide?: boolean;
  animation?: boolean;
  toastService?: Toast;
  contextualClass?: string;

  constructor({
    title,
    message,
    iconUrl,
    delay,
    autoHide,
    animation,
    toastService,
    contextualClass,
    channel,
    $event,
    $context
  }: {
    title?: string;
    message: string;
    iconUrl?: string;
    delay?: number;
    autoHide?: boolean;
    animation?: boolean;
    toastService?: Toast;
    contextualClass?: string;
    channel?: string;
    $event?: CustomEvent;
    $context?: any;
  }) {
    super("toast", title);
    this.message = message;
    this.iconUrl = iconUrl;
    this.delay = delay;
    this.autoHide = autoHide;
    this.animation = animation;
    this.toastService = toastService;
    this.contextualClass = contextualClass;
    this.channel = channel;
    this.$event = $event;
    this.$context = $context;
  }
}
