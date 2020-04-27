import { deferred } from "@ribajs/utils/src/control";
import { BaseTransition } from './BaseTransition';
import { Transition } from '../../interfaces/transition';

declare global {
  // tslint:disable: interface-name
  interface Window { model: any }
}

/**
 * Basic Transition object, wait for the new Container to be ready,
 * scroll top, and finish the transition (removing the old container and displaying the new one)
 *
 * @private
 */
class CustomTransition extends BaseTransition implements Transition {

  public init(oldContainer: HTMLElement, newContainer: Promise<HTMLElement>): Promise<void> {

    this.oldContainer = oldContainer;
    this.deferred = deferred();
    const newContainerReady = deferred();
    this.newContainerLoading = newContainerReady.promise;

    this.start();

    newContainer.then((_newContainer: HTMLElement) => {
      this.newContainer = _newContainer;
      newContainerReady.resolve();
    });

    return this.deferred.promise;
  }

  public start() {
    if (!this.newContainerLoading) {
      throw new Error('this.newContainerLoading is not set');
    }
    this.newContainerLoading.then(this.finish.bind(this));
  }

  public finish(/*container: HTMLElement*/) {
    document.body.scrollTop = 0;
    this.done();
  }

}

export { CustomTransition };
