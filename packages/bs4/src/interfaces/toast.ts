import { ToastService } from "../services";

export interface Toast {
  title?: string;
  message: string;
  iconUrl?: string;
  delay?: number;
  autoHide?: boolean;
  animation?: boolean;
  toastService?: ToastService;
}

export interface ToastBinderData extends Toast {
  channel?: string;
}
