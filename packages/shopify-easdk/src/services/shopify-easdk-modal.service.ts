import {
  EASDK,
  // EASDKWrapper,
  // BarConfig,
  // Bar,
  // BarWrapper,
  // LoadingStateWrapper,
  // Config,
  // PaginationConfig,
  // ButtonConfig,
  // ButtonCallback,
  // Modal,
  ModalWrapper,
  ModalInit,
  ModalAlertOptions,
  ModalConfirmOptions,
  ModalInputOptions,
  ProductPickerOptions,
  ProductPickerCallback,
  // User,
  // UserData,
  // ReceiveMessage,
  // ShopifyApp,
} from "../interfaces/shopify-easdk";

import { WrapperService } from "./wrapper.service";

export class ModalWrapperService
  extends WrapperService
  implements ModalWrapper {
  // Singleton instace
  public static instance?: ModalWrapperService;

  protected dialog: any; // TODO

  constructor(shopifyApp?: EASDK) {
    super(shopifyApp);
    if (ModalWrapperService.instance) {
      return ModalWrapperService.instance;
    }
    ModalWrapperService.instance = this;
  }

  /**
   * Opens a modal dialog in the Shopify admin that in turn loads an iframe inside of it with the passed in URL.
   * It accepts a src attribute to be loaded, a title for the top of the bar,
   * and a configuration of primary and secondary buttons identical to Bar.initialize().
   * It also accepts a callback function that is called when the modal is closed.
   *
   * To learn how to communicate from the modal iframe to the app iframe, read Modal & App Communication.
   *
   * @see https://help.shopify.com/api/sdks/shopify-apps/embedded-app-sdk/features#modal-and-application-communication
   * @param {ModalInit} init
   * @param {(result, data) => void} fn
   * @memberof Modal
   */
  public open(
    init: ModalInit,
    fn?: (confirmed: boolean, data: any) => void,
    forceFallback = false
  ) {
    const fallback = this.useFallback(forceFallback);
    this.event.trigger("open", fallback, init);
    this.shopifyApp.Modal.open(init, (confirmed: boolean, data: any) => {
      // modal closed
      this.event.trigger("closed", fallback, confirmed, data);
      if (typeof fn === "function") {
        fn(confirmed, data);
      }
    });
  }

  /**
   * Opens a Javascript style alert() in the admin.
   * When the modal is closed the optional callback is called and a modal close message is sent.
   * For this Wrapper you can get a Observable to get the close result by calling the afterClosed function you get as the return value.
   *
   * @param options
   * @param fn not used in this wrapper, use afterClosed you get as return value instead!
   * @memberof ModalWrapperService
   */
  public alert(
    options: ModalAlertOptions,
    fn: (confirmed: boolean) => void,
    forceFallback = false
  ) {
    const fallback = this.useFallback(forceFallback);
    console.debug("alert", options);
    this.event.trigger("alert", fallback, options);
    this.shopifyApp.Modal.alert(options, (confirmed) => {
      // modal closed
      this.event.trigger("closed", fallback, confirmed);
      if (typeof fn === "function") {
        fn(confirmed);
      }
    });
  }

  /**
   * Opens a Javascript style confirm() in the admin.
   * When the modal is closed the optional callback is called and a modal close message is sent.
   * The callback has the status of the closure passed in.
   *
   * @param options
   * @param fn `result` of callback is true if the user has accepted
   * @memberof Modal
   */
  public confirm(
    options: ModalConfirmOptions,
    fn: (confirmed: boolean) => void,
    forceFallback = false
  ) {
    const fallback = this.useFallback(forceFallback);
    console.debug("alert", fallback, options);
    this.event.trigger("alert", fallback, options);
    this.shopifyApp.Modal.confirm(options, (confirmed) => {
      // modal closed
      this.event.trigger("closed", fallback, confirmed);
      if (typeof fn === "function") {
        fn(confirmed);
      }
    });
  }

  /**
   * Opens a Javascript style input() dialog in the admin.
   * When the modal is closed the optional callback is called and a modal close message is sent.
   * The callback has the status of the closure and the contents of the input box passed in.
   *
   * @param {ModalInputOptions} options
   * @param {(result, data) => void} fn
   * @memberof Modal
   */
  public input(
    options: ModalInputOptions,
    fn: (result: boolean, data: any) => void,
    forceFallback = false
  ) {
    const fallback = this.useFallback(forceFallback);
    console.debug("alert", fallback, options);
    this.event.trigger("alert", fallback, options);
    this.shopifyApp.Modal.input(options, (confirmed: boolean, data: any) => {
      // modal closed
      this.event.trigger("input", fallback, confirmed, data);
      if (typeof fn === "function") {
        fn(confirmed, data);
      }
    });
  }

  /**
   * Closes the currently open modal window and manually sets the result and data payload.
   * Result expects a true or false and data can contain the message payload, or nothing.
   *
   * @param {boolean} result
   * @param {string} data
   * @memberof Modal
   */
  public close(result: boolean, data: string): void {
    return this.shopifyApp.Modal.close(result, data);
  }

  /**
   * Sets the height of the currently open modal window up to a maximum height of 700px and a minimum of 100px.
   * The height is applied to the body (excluding the header and footer) of the rendered modal.
   *
   * @param {number} height
   * @memberof Modal
   */
  public setHeight(height: number): void {
    return this.shopifyApp.Modal.setHeight(height);
  }

  /**
   * Opens a modal dialog containing a list of the products or collections available in the store,
   * with a search field for filtering results.
   * The modal can be used for selecting one or more products/collections, using the resource picker's options.
   *
   * The callback passed into the resource picker is invoked when the dialog is closed or a button is pressed.
   * The callback is passed a success flag (boolean) which will be true if products are selected.
   * The second parameter is a data object (JSON) which contains the selected products (if any)
   * and any errors that may have surfaced.
   *
   * @param {ProductPickerOptions} options
   * @param {(success: boolean, data: {products: [any], errors: [String]}) => void} fn
   * @memberof Modal
   */
  public productPicker(
    options: ProductPickerOptions,
    fn: ProductPickerCallback
  ): void {
    return this.shopifyApp.Modal.productPicker(options, fn);
  }

  /**
   * The collection picker has the same interface as the product picker.
   *
   * @param {ProductPickerOptions} options
   * @param {ProductPickerCallback} fn
   * @memberof Modal
   */
  public collectionPicker(
    options: ProductPickerOptions,
    fn: ProductPickerCallback
  ): void {
    return this.shopifyApp.Modal.collectionPicker(options, fn);
  }
}
