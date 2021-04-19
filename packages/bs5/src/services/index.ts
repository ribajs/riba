import { ServicesCreator } from "@ribajs/core";
import { Bs5ModuleOptions } from "../types";
import { Carousel } from "./carousel";
import { Collapse } from "./collapse";
import { Dropdown } from "./dropdown";
import { ModalNotification } from "./modal-notification";
import { Modal } from "./modal";
import { Tooltip } from "./tooltip";
import { Popover } from "./popover";
import { Bs5Service } from "./bs5.service";
import { ToastNotification } from "./toast-notification";
import { Toast } from "./toast";

const services: ServicesCreator = (options: Bs5ModuleOptions) => {
  Bs5Service.setSingleton(options);
  return {
    Carousel,
    Collapse,
    Dropdown,
    ModalNotification,
    Modal,
    Tooltip,
    Popover,
    Bs5Service,
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
  Bs5Service,
  ToastNotification,
  Toast,
};
