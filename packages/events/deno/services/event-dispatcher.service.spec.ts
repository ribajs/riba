import { EventDispatcher } from "./event-dispatcher.service.js";

describe("riba.core", () => {
  describe("EventDispatcher", () => {
    let eventDispatcher: EventDispatcher;

    beforeEach(() => {
      EventDispatcher.deleteAllInstances();
      eventDispatcher = new EventDispatcher();
    });

    it("The event dispatcher should call a simple function on all event listeners if trigger function is called", () => {
      let listener1 = jest.fn();
      let listener2 = jest.fn();
      let listener3 = jest.fn();
      eventDispatcher.on("test1", listener1);
      eventDispatcher.on("test2", listener1);
      eventDispatcher.on("test2", listener2);
      eventDispatcher.on("test3", listener1);
      eventDispatcher.on("test3", listener2);
      eventDispatcher.on("test3", listener3);
      eventDispatcher.trigger("test1");
      eventDispatcher.trigger("test2");
      eventDispatcher.trigger("test3");
      expect(listener1.mock.calls.length).toBe(3);
      expect(listener2.mock.calls.length).toBe(2);
      expect(listener3.mock.calls.length).toBe(1);
    });

    //passed
    it("The event dispatcher should use the given thisContext for all handlers", () => {
      let obj1 = {
        value: 1,
      };
      let obj2 = {
        value: 2,
      };
      let obj3 = {
        value: 3,
      };
      const handler = jest.fn(function (this: { name: string }) {
        return (this as any).value;
      });
      eventDispatcher.on("test1", handler, obj1);
      eventDispatcher.on("test2", handler, obj2);
      eventDispatcher.on("test3", handler, obj3);
      eventDispatcher.trigger("test1");
      eventDispatcher.trigger("test2");
      eventDispatcher.trigger("test3");
      expect(handler.mock.results.map((r) => r.value)).toEqual([1, 2, 3]);
    });

    it("The event listener should only be removed according to supplied arguments", () => {
      let value: any = 1;
      let thisContext = { value: 7452 };
      const obj = {
        value: 42,
        testFunction: function (this: { value: number }) {
          value = this.value;
        },
      };
      eventDispatcher.on("test1", obj.testFunction, thisContext);
      eventDispatcher.off("test1", obj.testFunction, { number: 7452 });
      eventDispatcher.trigger("test1");
      expect(value).toBe(7452); //test if testFunction is still active

      value = undefined;
      eventDispatcher.off("test1", obj.testFunction, thisContext);
      expect(value).toBe(undefined); //test if testFunction is removed

      eventDispatcher.on("test1", obj.testFunction, thisContext);
      eventDispatcher.on("test1", obj.testFunction, obj);
      eventDispatcher.off("test1", obj.testFunction, thisContext);
      eventDispatcher.trigger("test1");
      expect(value).toBe(42); //test if testFunction is removed
    });

    it("All event listeners for a given event name should only be removed if only the event name is supplied to 'off()'", () => {
      let value: any = 1;
      const thisContext = { value: 7452 };
      const thatContext = { value: 666 };
      const obj = {
        value: 42,
        testFunction: function (this: { value: number }) {
          value = this.value;
        },
      };
      eventDispatcher.on("test1", obj.testFunction);
      eventDispatcher.on("test1", obj.testFunction, thatContext);
      eventDispatcher.on("test1", obj.testFunction, thisContext);
      eventDispatcher.off("test1", obj.testFunction, thisContext);
      eventDispatcher.on("test1", () => (value = 23));

      eventDispatcher.off("test1");
      eventDispatcher.trigger("test1");
      // No event handler got triggered: value still 1
      expect(value).toBe(1);
    });

    it("All event listeners for all events should be removed if no arguments are supplied to 'off()'", () => {
      let value1: any = 1;
      let value2: any = 2;
      let value3: any = 3;
      const thisContext = { value: 7452 };
      const thatContext = { value: 666 };
      const obj = {
        value: 42,
        testFunction1: function (this: { value: number }) {
          value1 = this.value;
        },
      };
      function testFunction2() {
        value2 = "All your base are belong to us.";
      }
      function testFunction3() {
        value3 = "All my base are belong to yours.";
      }
      eventDispatcher.on("test1", obj.testFunction1);
      eventDispatcher.on("test2", obj.testFunction1, thatContext);
      eventDispatcher.on("test3", obj.testFunction1, thisContext);
      eventDispatcher.on("test1", obj.testFunction1, thisContext);
      eventDispatcher.on("test4", () => (value1 = 777));
      eventDispatcher.on("test5", testFunction2);
      eventDispatcher.on("test6", testFunction3);

      // remove all listeners for all events
      eventDispatcher.off();

      eventDispatcher.trigger("test1");
      eventDispatcher.trigger("test2");
      eventDispatcher.trigger("test3");
      eventDispatcher.trigger("test4");
      eventDispatcher.trigger("test5");
      eventDispatcher.trigger("test6");

      // Expect that nothing has changed
      expect(value1).toBe(1);
      expect(value2).toBe(2);
      expect(value3).toBe(3);
    });

    it("'new EventDispatcher()' without arguments should always return a new independent EventDispatcher instance", () => {
      let dispatcher1 = new EventDispatcher();
      let dispatcher2 = new EventDispatcher();
      let dispatcher3 = new EventDispatcher();
      // These should all be different objects:
      expect(dispatcher1).not.toBe(dispatcher2);
      expect(dispatcher2).not.toBe(dispatcher3);
      expect(dispatcher3).not.toBe(dispatcher1);
    });

    it("'new EventDispatcher(namespace)' should return the same instance for given namespace", () => {
      let dispatcher1 = new EventDispatcher("number1");
      let dispatcher2 = new EventDispatcher("number1");
      let dispatcher3 = new EventDispatcher("number2");
      let dispatcher4 = new EventDispatcher("number2");
      // Expect dispatcher1 === dispatcher2 && dispatcher 3 === dispatcher4 && dispatcher 1 !== dispatcher3
      expect(dispatcher1).toBe(dispatcher2);
      expect(dispatcher3).toBe(dispatcher4);
      expect(dispatcher1).not.toBe(dispatcher3);
    });

    it("'EventDispatcher.getInstance(namespace)' and 'new EventDispatcher(namespace)' should yield the same result, regardless of order", () => {
      let dispatcher1 = new EventDispatcher("this is my name");
      let dispatcher2 = EventDispatcher.getInstance("this is my name");

      let dispatcher3 = EventDispatcher.getInstance("the bird is the word");
      let dispatcher4 = new EventDispatcher("the bird is the word");
      // Expect dispatcher1 === dispatcher2 && dispatcher 3 === dispatcher4 && dispatcher 1 !== dispatcher3
      expect(dispatcher1).toBe(dispatcher2);
      expect(dispatcher3).toBe(dispatcher4);
      expect(dispatcher1).not.toBe(dispatcher3);
    });

    it("'EventDispatcher.getInstance()' should return 'EventDispatcher.getInstance(\"main\")'", () => {
      let dispatcher1 = EventDispatcher.getInstance();
      let dispatcher2 = EventDispatcher.getInstance("main");
      let dispatcher3 = new EventDispatcher("main");

      // Expect them all to be equal.
      expect(dispatcher1).toBe(dispatcher2);
      expect(dispatcher2).toBe(dispatcher3);
      expect(dispatcher3).toBe(dispatcher1);
    });
  });
});
