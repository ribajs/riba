import { ServicesCreator } from "@ribajs/core";
import { Bs5ModuleOptions } from "../types";

import { Carousel } from "./carousel";
import { Collapse } from "./collapse";
import { Dropdown } from "./dropdown";
import { ModalNotification } from "./modal-notification";
import { Modal } from "./modal";
import { Tooltip } from "./tooltip";
import { Popover } from "./popover";
import { ToastNotification } from "./toast-notification";
import { Toast } from "./toast";

export const services: ServicesCreator = (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  options: Bs5ModuleOptions
) => {
  return {
    Carousel,
    Collapse,
    Dropdown,
    ModalNotification,
    Modal,
    Tooltip,
    Popover,
    ToastNotification,
    Toast,
  };
};

export default services;

export {
  Carousel,
  Collapse,
  Dropdown,
  ModalNotification,
  Modal,
  Tooltip,
  Popover,
  ToastNotification,
  Toast,
};
