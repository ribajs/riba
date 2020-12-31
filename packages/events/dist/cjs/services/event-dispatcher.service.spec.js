"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const event_dispatcher_service_1 = require("./event-dispatcher.service");
describe("riba.core", () => {
    describe("EventDispatcher", () => {
        let eventDispatcher;
        beforeEach(() => {
            event_dispatcher_service_1.EventDispatcher.instances = {}; //clear all old event dispatcher instances
            eventDispatcher = new event_dispatcher_service_1.EventDispatcher();
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
            let dispatcher1 = new event_dispatcher_service_1.EventDispatcher();
            let dispatcher2 = new event_dispatcher_service_1.EventDispatcher();
            let dispatcher3 = new event_dispatcher_service_1.EventDispatcher();
            // These should all be different objects:
            expect(dispatcher1).not.toBe(dispatcher2);
            expect(dispatcher2).not.toBe(dispatcher3);
            expect(dispatcher3).not.toBe(dispatcher1);
        });
        it("'new EventDispatcher(namespace)' should return the same instance for given namespace", () => {
            let dispatcher1 = new event_dispatcher_service_1.EventDispatcher("number1");
            let dispatcher2 = new event_dispatcher_service_1.EventDispatcher("number1");
            let dispatcher3 = new event_dispatcher_service_1.EventDispatcher("number2");
            let dispatcher4 = new event_dispatcher_service_1.EventDispatcher("number2");
            // Expect dispatcher1 === dispatcher2 && dispatcher 3 === dispatcher4 && dispatcher 1 !== dispatcher3
            expect(dispatcher1).toBe(dispatcher2);
            expect(dispatcher3).toBe(dispatcher4);
            expect(dispatcher1).not.toBe(dispatcher3);
        });
        it("'EventDispatcher.getInstance(namespace)' and 'new EventDispatcher(namespace)' should yield the same result, regardless of order", () => {
            let dispatcher1 = new event_dispatcher_service_1.EventDispatcher("this is my name");
            let dispatcher2 = event_dispatcher_service_1.EventDispatcher.getInstance("this is my name");
            let dispatcher3 = event_dispatcher_service_1.EventDispatcher.getInstance("the bird is the word");
            let dispatcher4 = new event_dispatcher_service_1.EventDispatcher("the bird is the word");
            // Expect dispatcher1 === dispatcher2 && dispatcher 3 === dispatcher4 && dispatcher 1 !== dispatcher3
            expect(dispatcher1).toBe(dispatcher2);
            expect(dispatcher3).toBe(dispatcher4);
            expect(dispatcher1).not.toBe(dispatcher3);
        });
        it("'EventDispatcher.getInstance()' should return 'EventDispatcher.getInstance(\"main\")'", () => {
            let dispatcher1 = event_dispatcher_service_1.EventDispatcher.getInstance();
            let dispatcher2 = event_dispatcher_service_1.EventDispatcher.getInstance("main");
            let dispatcher3 = new event_dispatcher_service_1.EventDispatcher("main");
            // Expect them all to be equal.
            expect(dispatcher1).toBe(dispatcher2);
            expect(dispatcher2).toBe(dispatcher3);
            expect(dispatcher3).toBe(dispatcher1);
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnQtZGlzcGF0Y2hlci5zZXJ2aWNlLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc2VydmljZXMvZXZlbnQtZGlzcGF0Y2hlci5zZXJ2aWNlLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx5RUFBNkQ7QUFFN0QsUUFBUSxDQUFDLFdBQVcsRUFBRSxHQUFHLEVBQUU7SUFDekIsUUFBUSxDQUFDLGlCQUFpQixFQUFFLEdBQUcsRUFBRTtRQUMvQixJQUFJLGVBQWdDLENBQUM7UUFFckMsVUFBVSxDQUFDLEdBQUcsRUFBRTtZQUNkLDBDQUFlLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQyxDQUFDLDBDQUEwQztZQUMxRSxlQUFlLEdBQUcsSUFBSSwwQ0FBZSxFQUFFLENBQUM7UUFDMUMsQ0FBQyxDQUFDLENBQUM7UUFFSCxFQUFFLENBQUMseUdBQXlHLEVBQUUsR0FBRyxFQUFFO1lBQ2pILElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUMxQixJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDMUIsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQzFCLGVBQWUsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1lBQ3ZDLGVBQWUsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1lBQ3ZDLGVBQWUsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1lBQ3ZDLGVBQWUsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1lBQ3ZDLGVBQWUsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1lBQ3ZDLGVBQWUsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1lBQ3ZDLGVBQWUsQ0FB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