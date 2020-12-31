import { EventDispatcher } from './event-dispatcher.service';
describe("riba.core", () => {
    describe("EventDispatcher", () => {
        let eventDispatcher;
        beforeEach(() => {
            EventDispatcher.instances = {}; //clear all old event dispatcher instances
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
                value: 1
            };
            let obj2 = {
                value: 2
            };
            let obj3 = {
                value: 3
            };
            const handler = jest.fn(function () { return this.value; });
            eventDispatcher.on("test1", handler, obj1);
            eventDispatcher.on("test2", handler, obj2);
            eventDispatcher.on("test3", handler, obj3);
            eventDispatcher.trigger("test1");
            eventDispatcher.trigger("test2");
            eventDispatcher.trigger("test3");
            expect(handler.mock.results.map(r => r.value)).toEqual([1, 2, 3]);
        });
        it("The event listener should only be removed according to supplied arguments", () => {
            let value = 1;
            let thisContext = { value: 7452 };
            const obj = {
                value: 42,
                testFunction: function () {
                    value = this.value;
                }
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
            let value = 1;
            const thisContext = { value: 7452 };
            const thatContext = { value: 666 };
            const obj = {
                value: 42,
                testFunction: function () {
                    value = this.value;
                },
            };
            eventDispatcher.on("test1", obj.testFunction);
            eventDispatcher.on("test1", obj.testFunction, thatContext);
            eventDispatcher.on("test1", obj.testFunction, thisContext);
            eventDispatcher.off("test1", obj.testFunction, thisContext);
            eventDispatcher.on("test1", () => value = 23);
            eventDispatcher.off("test1");
            eventDispatcher.trigger("test1");
            // No event handler got triggered: value still 1
            expect(value).toBe(1);
        });
        it("All event listeners for all events should be removed if no arguments are supplied to 'off()'", () => {
            let value1 = 1;
            let value2 = 2;
            let value3 = 3;
            const thisContext = { value: 7452 };
            const thatContext = { value: 666 };
            const obj = {
                value: 42,
                testFunction1: function () {
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
            eventDispatcher.on("test4", () => value1 = 777);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnQtZGlzcGF0Y2hlci5zZXJ2aWNlLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc2VydmljZXMvZXZlbnQtZGlzcGF0Y2hlci5zZXJ2aWNlLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBRTdELFFBQVEsQ0FBQyxXQUFXLEVBQUUsR0FBRyxFQUFFO0lBQ3pCLFFBQVEsQ0FBQyxpQkFBaUIsRUFBRSxHQUFHLEVBQUU7UUFDL0IsSUFBSSxlQUFnQyxDQUFDO1FBRXJDLFVBQVUsQ0FBQyxHQUFHLEVBQUU7WUFDZCxlQUFlLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQyxDQUFDLDBDQUEwQztZQUMxRSxlQUFlLEdBQUcsSUFBSSxlQUFlLEVBQUUsQ0FBQztRQUMxQyxDQUFDLENBQUMsQ0FBQztRQUVILEVBQUUsQ0FBQyx5R0FBeUcsRUFBRSxHQUFHLEVBQUU7WUFDakgsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQzFCLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUMxQixJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDMUIsZUFBZSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDLENBQUM7WUFDdkMsZUFBZSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDLENBQUM7WUFDdkMsZUFBZSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDLENBQUM7WUFDdkMsZUFBZSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDLENBQUM7WUFDdkMsZUFBZSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDLENBQUM7WUFDdkMsZUFBZSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsU0FB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