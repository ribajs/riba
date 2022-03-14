"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const event_dispatcher_service_js_1 = require("./event-dispatcher.service.js");
describe("riba.core", () => {
    describe("EventDispatcher", () => {
        let eventDispatcher;
        beforeEach(() => {
            event_dispatcher_service_js_1.EventDispatcher.deleteAllInstances();
            eventDispatcher = new event_dispatcher_service_js_1.EventDispatcher();
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
            expect(value).toBe(7452);
            value = undefined;
            eventDispatcher.off("test1", obj.testFunction, thisContext);
            expect(value).toBe(undefined);
            eventDispatcher.on("test1", obj.testFunction, thisContext);
            eventDispatcher.on("test1", obj.testFunction, obj);
            eventDispatcher.off("test1", obj.testFunction, thisContext);
            eventDispatcher.trigger("test1");
            expect(value).toBe(42);
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
            eventDispatcher.off();
            eventDispatcher.trigger("test1");
            eventDispatcher.trigger("test2");
            eventDispatcher.trigger("test3");
            eventDispatcher.trigger("test4");
            eventDispatcher.trigger("test5");
            eventDispatcher.trigger("test6");
            expect(value1).toBe(1);
            expect(value2).toBe(2);
            expect(value3).toBe(3);
        });
        it("'new EventDispatcher()' without arguments should always return a new independent EventDispatcher instance", () => {
            let dispatcher1 = new event_dispatcher_service_js_1.EventDispatcher();
            let dispatcher2 = new event_dispatcher_service_js_1.EventDispatcher();
            let dispatcher3 = new event_dispatcher_service_js_1.EventDispatcher();
            expect(dispatcher1).not.toBe(dispatcher2);
            expect(dispatcher2).not.toBe(dispatcher3);
            expect(dispatcher3).not.toBe(dispatcher1);
        });
        it("'new EventDispatcher(namespace)' should return the same instance for given namespace", () => {
            let dispatcher1 = new event_dispatcher_service_js_1.EventDispatcher("number1");
            let dispatcher2 = new event_dispatcher_service_js_1.EventDispatcher("number1");
            let dispatcher3 = new event_dispatcher_service_js_1.EventDispatcher("number2");
            let dispatcher4 = new event_dispatcher_service_js_1.EventDispatcher("number2");
            expect(dispatcher1).toBe(dispatcher2);
            expect(dispatcher3).toBe(dispatcher4);
            expect(dispatcher1).not.toBe(dispatcher3);
        });
        it("'EventDispatcher.getInstance(namespace)' and 'new EventDispatcher(namespace)' should yield the same result, regardless of order", () => {
            let dispatcher1 = new event_dispatcher_service_js_1.EventDispatcher("this is my name");
            let dispatcher2 = event_dispatcher_service_js_1.EventDispatcher.getInstance("this is my name");
            let dispatcher3 = event_dispatcher_service_js_1.EventDispatcher.getInstance("the bird is the word");
            let dispatcher4 = new event_dispatcher_service_js_1.EventDispatcher("the bird is the word");
            expect(dispatcher1).toBe(dispatcher2);
            expect(dispatcher3).toBe(dispatcher4);
            expect(dispatcher1).not.toBe(dispatcher3);
        });
        it("'EventDispatcher.getInstance()' should return 'EventDispatcher.getInstance(\"main\")'", () => {
            let dispatcher1 = event_dispatcher_service_js_1.EventDispatcher.getInstance();
            let dispatcher2 = event_dispatcher_service_js_1.EventDispatcher.getInstance("main");
            let dispatcher3 = new event_dispatcher_service_js_1.EventDispatcher("main");
            expect(dispatcher1).toBe(dispatcher2);
            expect(dispatcher2).toBe(dispatcher3);
            expect(dispatcher3).toBe(dispatcher1);
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnQtZGlzcGF0Y2hlci5zZXJ2aWNlLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc2VydmljZXMvZXZlbnQtZGlzcGF0Y2hlci5zZXJ2aWNlLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwrRUFBZ0U7QUFFaEUsUUFBUSxDQUFDLFdBQVcsRUFBRSxHQUFHLEVBQUU7SUFDekIsUUFBUSxDQUFDLGlCQUFpQixFQUFFLEdBQUcsRUFBRTtRQUMvQixJQUFJLGVBQWdDLENBQUM7UUFFckMsVUFBVSxDQUFDLEdBQUcsRUFBRTtZQUNkLDZDQUFlLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztZQUNyQyxlQUFlLEdBQUcsSUFBSSw2Q0FBZSxFQUFFLENBQUM7UUFDMUMsQ0FBQyxDQUFDLENBQUM7UUFFSCxFQUFFLENBQUMseUdBQXlHLEVBQUUsR0FBRyxFQUFFO1lBQ2pILElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUMxQixJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDMUIsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQzFCLGVBQWUsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1lBQ3ZDLGVBQWUsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1lBQ3ZDLGVBQWUsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1lBQ3ZDLGVBQWUsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1lBQ3ZDLGVBQWUsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1lBQ3ZDLGVBQWUsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1lBQ3ZDLGVBQWUsQ0FBQyxPQUFPLENBQUMsT0FB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QUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ3RDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDdEMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDNUMsQ0FBQyxDQUFDLENBQUM7UUFFSCxFQUFFLENBQUMsdUZBQXVGLEVBQUUsR0FBRyxFQUFFO1lBQy9GLElBQUksV0FBVyxHQUFHLDZDQUFlLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDaEQsSUFBSSxXQUFXLEdBQUcsNkNBQWUsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDdEQsSUFBSSxXQUFXLEdBQUcsSUFBSSw2Q0FBZSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBRzlDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDdEMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUN0QyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3hDLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyJ9