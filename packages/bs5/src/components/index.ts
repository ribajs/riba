import { Bs5ModuleOptions } from "../types";
import { ComponentsCreator } from "@ribajs/core";

import { Bs5DropdownComponent } from "./bs5-dropdown/bs5-dropdown.component";
import { Bs5AccordionComponent } from "./bs5-accordion/bs5-accordion.component";
import { Bs5ButtonComponent } from "./bs5-button/bs5-button.component";
import { Bs5CarouselComponent } from "./bs5-carousel/bs5-carousel.component";
import { Bs5ColorPickerComponent } from "./bs5-colorpicker/bs5-colorpicker.component";
import { Bs5ContentsComponent } from "./bs5-contents/bs5-contents.component";
import { Bs5IconComponent } from "./bs5-icon/bs5-icon.component";
import { Bs5ScrollspyComponent } from "./bs5-scrollspy/bs5-scrollspy.component";
import { Bs5ShareComponent } from "./bs5-share/bs5-share.component";
import { Bs5SidebarComponent } from "./bs5-sidebar/bs5-sidebar.component";
import { Bs5SlideshowComponent } from "./bs5-slideshow/bs5-slideshow.component";
import { Bs5ToggleButtonComponent } from "./bs5-toggle-button/bs5-toggle-button.component";
import { Bs5NavbarComponent } from "./bs5-navbar/bs5-navbar.component";
import { Bs5TabsComponent } from "./bs5-tabs/bs5-tabs.component";
import { Bs5FormComponent } from "./bs5-form/bs5-form.component";
import { Bs5NotificationContainerComponent } from "./bs5-notification-container/bs5-notification-container.component";
import { Bs5ToastItemComponent } from "./bs5-toast-item/bs5-toast-item.component";
import { Bs5ModalItemComponent } from "./bs5-modal-item/bs5-modal-item.component";
import { Bs5TaggedImageComponent } from "./bs5-tagged-image/bs5-tagged-image.component";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const components: ComponentsCreator = (options: Bs5ModuleOptions) => {
  Bs5SidebarComponent.setModuleOptions(options);
  Bs5SlideshowComponent.setModuleOptions(options);

  return {
    Bs5DropdownComponent,
    Bs5AccordionComponent,
    Bs5ButtonComponent,
    Bs5CarouselComponent,
    Bs5ColorPickerComponent,
    Bs5ContentsComponent,
    Bs5IconComponent,
    Bs5ScrollspyComponent,
    Bs5ShareComponent,
    Bs5SidebarComponent,
    Bs5SlideshowComponent,
    Bs5ToggleButtonComponent,
    Bs5NavbarComponent,
    Bs5TabsComponent,
    Bs5FormComponent,
    Bs5NotificationContainerComponent,
    Bs5ToastItemComponent,
    Bs5ModalItemComponent,
    Bs5TaggedImageComponent,
  };
};

export default components;

export {
  Bs5DropdownComponent,
  Bs5AccordionComponent,
  Bs5ButtonComponent,
  Bs5CarouselComponent,
  Bs5ColorPickerComponent,
  Bs5ContentsComponent,
  Bs5IconComponent,
  Bs5ScrollspyComponent,
  Bs5ShareComponent,
  Bs5SidebarComponent,
  Bs5SlideshowComponent,
  Bs5ToggleButtonComponent,
  Bs5NavbarComponent,
  Bs5TabsComponent,
  Bs5FormComponent,
  Bs5NotificationContainerComponent,
  Bs5ToastItemComponent,
  Bs5ModalItemComponent,
  Bs5TaggedImageComponent,
};
