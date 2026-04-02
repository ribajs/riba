export interface Notification {
  title?: string;
  message: string;
  type?: "info" | "success" | "warning" | "error";
  /**
   * Auto-dismiss timeout in milliseconds. 0 means no auto-dismiss.
   */
  timeout?: number;
}

export interface ModalNotification extends Notification {
  /** Show close button */
  closable?: boolean;
}

export interface ToastNotification extends Notification {
  /** Position of the toast */
  position?:
    | "top-right"
    | "top-left"
    | "bottom-right"
    | "bottom-left"
    | "top-center"
    | "bottom-center";
}
