export enum CollapseEvents {
  /**
   * This event fires immediately when the show instance method is called.
   */
  show = 'show.bs.collapse',

  /**
   * This event is fired when a collapse element has been made visible to the user (will wait for CSS transitions to complete).
   */
  shown = 'shown.bs.collapse',

  /**
   * This event is fired immediately when the hide method has been called.
   */
  hide = 'hide.bs.collapse',

  /**
   * This event is fired when a collapse element has been hidden from the
   * user (will wait for CSS transitions to complete).
   */
  hidden = 'hidden.bs.collapse'
}
