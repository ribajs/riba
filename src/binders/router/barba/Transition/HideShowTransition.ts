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

  protected action: 'replace' | 'append';

  protected scrollToTop: boolean;

  constructor(action: 'replace' | 'append' = 'replace', scrollToTop: boolean = true) {
    super(action);
    this.action = action;
    this.scrollToTop = scrollToTop;
    this.debug('new HideShowTransition', this.action);
  }

  /**
   * TODO use css transition: https://github.com/julianshapiro/velocity/wiki/Property---ScrollTop
   */
  public doScrollToTop() {
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
    if (this.scrollToTop) {
      this.doScrollToTop()
      .then(() => {
        this.debug('scroll then done');
      });
    }

    this.newContainerLoading.then(this.finish.bind(this));
  }

  public finish() {
    this.debug('finish');
    this.done();
  }
}
