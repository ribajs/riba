import Debug from 'debug';
import { BaseTransition, ITransition } from './BaseTransition';
import $ from 'jquery';

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

  public start() {
    this.debug('start');
    // alternative use fpr css transition: https://github.com/julianshapiro/velocity/wiki/Property---ScrollTop
    $('html,body').animate({
      scrollTop: 0,
    }, 1000);
    if (!this.newContainerLoading) {
      throw new Error('this.newContainerLoading is not set');
    }
    this.newContainerLoading.then(this.finish.bind(this));
  }

  public finish() {
    this.debug('finish');
    this.done();
  }
}
