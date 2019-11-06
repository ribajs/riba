import { EventDispatcher, Utils } from '@ribajs/core';
import { State } from '../interfaces';

/**
 * BaseView to be extended
 */
abstract class BaseView {
  /**
   * Namespace of the view.
   * (need to be associated with the data-namespace of the container)
   */
  protected namespace?: string;

  protected container?: HTMLElement;

  private dispatcher = new EventDispatcher();

  /**
   * Helper to extend the object
   */
  public extend(obj: object) {
    return Utils.extend(false, this, obj);
  }

  /**
   * Init the view.
   * P.S. Is suggested to init the view before starting Barba.Pjax.start(),
   * in this way .onEnter() and .onEnterCompleted() will be fired for the current
   * container when the page is loaded.
   */
  public init() {
    const self = this;

    this.dispatcher.on('initStateChange', (viewId: string, newStatus: State, oldStatus: State) => {
      if (oldStatus && oldStatus.namespace === self.namespace) {
        self.onLeave();
      }
    });

    this.dispatcher.on('newPageReady', (viewId: string, newStatus: State, oldStatus: State, container: HTMLElement, html: string, isInit: boolean) => {
      self.container = container;
      if (newStatus.namespace === self.namespace) {
        self.onEnter();
      }
    });

    this.dispatcher.on('transitionCompleted', (viewId: string, newStatus: State, oldStatus: State) => {
      if (newStatus.namespace === self.namespace) {
        self.onEnterCompleted();
      }

      if (oldStatus && oldStatus.namespace === self.namespace) {
        self.onLeaveCompleted();
      }
    });
  }

 /**
  * This function will be fired when the container
  * is ready and attached to the DOM.
  */
 protected abstract onEnter(): any;

  /**
   * This function will be fired when the transition
   * to this container has just finished.
   */
  protected abstract onEnterCompleted(): any;

  /**
   * This function will be fired when the transition
   * to a new container has just started.
   */
  protected abstract onLeave(): any;

  /**
   * This function will be fired when the container
   * has just been removed from the DOM.
   */
  protected abstract onLeaveCompleted(): any;
}

export { BaseView };
