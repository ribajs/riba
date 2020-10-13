import { EventDispatcher } from './event-dispatcher.service';

describe('riba.core', () => {
  describe('EventDispatcher', () => {
    let eventDispatcher: EventDispatcher;

    beforeEach(() => {
      EventDispatcher.instances = {}; //clear all old event dispatcher instances
      eventDispatcher = new EventDispatcher(); //aquire singleton
    });

    it('The event dispatcher should call a simple function on all event listeners if trigger function is called', () => {
      let fail: boolean = true;
      eventDispatcher.on("test1", () => {
        fail = false;
      });
      eventDispatcher.trigger("test1");
      expect(fail).toBeFalse();
    });

    //passed
    it('The event dispatcher should use the given thisContext for all handlers', () => {
      let value: number = 1;
      eventDispatcher.on("test1", function(this: {value: number}) {
        value = this.value;
      }, { value: 7452 });
      eventDispatcher.trigger("test1");
      expect(value).toBe(7452);
    });

    it('The event listener should only be removed according to supplied arguments', () => {
      let value: any = 1;
      let thisContext = { value: 7452 }
      let testFunction = function(this: {value: number}) {
        value = this.value;
      };
      eventDispatcher.on("test1", testFunction, thisContext);
      eventDispatcher.off("test1", testFunction, { number: 7452})
      eventDispatcher.trigger("test1");
      expect(value).toBe(7452); //test if testFunction is still active
      
      value = undefined;
      eventDispatcher.off("test1", testFunction, thisContext);
      expect(value).toBe(undefined); //test if testFunction is removed

      eventDispatcher.on("test1", testFunction, thisContext);
      eventDispatcher.off("test1", testFunction)
      eventDispatcher.trigger("test1");
      expect(value).toBe(undefined); //test if testFunction is removed
    });

    it('Every event listener should only be removed if only one argument is supplied to off()', () => {
      let value: any = 1;
      let thisContext = { value: 7452 }
      let testFunction = function(this: {value: number}) {
        value = this.value;
      };
      eventDispatcher.on("test1", testFunction, thisContext);
      eventDispatcher.on("test1", testFunction);
      eventDispatcher.off("test1")
      eventDispatcher.trigger("test1");
      expect(value).toBe(1);
    });
  });
});
