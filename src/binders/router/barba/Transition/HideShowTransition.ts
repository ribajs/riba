import Debug from 'debug';
import { BaseTransition, ITransition } from './BaseTransition';
import JQuery from 'jquery';

/**
 * Basic Transition object, wait for the new Container to be ready,
 * scroll top, and finish the transition (removing the old container and displaying the new one)
 *
 * @private
 * @namespace Barba.HideShowTransition
 * @augments Barba.BaseTransition
 */
export class HideShowTransition extends BaseTransition implements ITransition {

  protected debug = Debug('barba:HideShowTransition');

  protected scrollToAnchorHash: boolean;

  constructor(scrollToAnchorHash: boolean = true) {
    super();
    this.debug('new HideShowTransition');
    this.scrollToAnchorHash = scrollToAnchorHash;
  }

  /**
   * TODO use css transition: https://github.com/julianshapiro/velocity/wiki/Property---ScrollTop
   */
  public scrollToTop() {
    this.debug('scrollToTop');
    return new Promise((resolve, reject) => {
      JQuery('html')
      .animate({
        scrollTop: 0,
      }, {
        duration: 1000,
        complete: () => {
          this.debug('scrollToTop complete');
          resolve();
        },
        fail: () => {
          this.debug('scrollToTop fail');
          reject();
        },
      });
    });
  }

  public start() {
    this.debug('start');
    if (!this.newContainerLoading) {
      throw new Error('this.newContainerLoading is not set');
    }
    this.scrollToTop()
    .then(() => {
      this.debug('scroll then done');
    });

    this.newContainerLoading.then(this.finish.bind(this));
  }

  public finish() {
    this.debug('finish');
    this.done();
  }
}
