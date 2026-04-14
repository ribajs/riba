export interface Notification {
  title?: string;
  message: string;
  /**
   * Notification kind: "toast" for toast notifications, "modal" for modal dialogs.
   */
  kind: "toast" | "modal";
  /**
   * Visual style type for the notification.
   */
  type?: "info" | "success" | "warning" | "error";
  /**
   * Auto-dismiss timeout in milliseconds. 0 means no auto-dismiss.
   */
  timeout?: number;
}

export interface ModalNotification extends Notification {
  kind: "modal";
  /** Show close button */
  closable?: boolean;
}

export interface ToastNotification extends Notification {
  kind: "toast";
  /** Position of the toast */
  position?:
    | "top-right"
    | "top-left"
    | "bottom-right"
    | "bottom-left"
    | "top-center"
    | "bottom-center";
}
