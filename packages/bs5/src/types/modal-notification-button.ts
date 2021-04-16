export interface ModalNotificationButton {
  /**
   * The text displayed in the button.
   */
  label: string;

  /**
   * Method in the scope which should be called when the button is clicked
   */
  action?: string;

  /**
   * Bootstrap button class e.g. btn-primary, btn-secondary, btn-success, btn-outline-primary, btn-outline-secondary, btn-lg and so on...
   */
  class?: string;
}
