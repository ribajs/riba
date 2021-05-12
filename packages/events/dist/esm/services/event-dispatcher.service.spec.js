import { EventDispatcher } from './event-dispatcher.service';
describe("riba.core", () => {
    describe("EventDispatcher", () => {
        let eventDispatcher;
        beforeEach(() => {
            EventDispatcher.instances = {};
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
            let dispatcher1 = new EventDispatcher();
            let dispatcher2 = new EventDispatcher();
            let dispatcher3 = new EventDispatcher();
            expect(dispatcher1).not.toBe(dispatcher2);
            expect(dispatcher2).not.toBe(dispatcher3);
            expect(dispatcher3).not.toBe(dispatcher1);
        });
        it("'new EventDispatcher(namespace)' should return the same instance for given namespace", () => {
            let dispatcher1 = new EventDispatcher("number1");
            let dispatcher2 = new EventDispatcher("number1");
            let dispatcher3 = new EventDispatcher("number2");
            let dispatcher4 = new EventDispatcher("number2");
            expect(dispatcher1).toBe(dispatcher2);
            expect(dispatcher3).toBe(dispatcher4);
            expect(dispatcher1).not.toBe(dispatcher3);
        });
        it("'EventDispatcher.getInstance(namespace)' and 'new EventDispatcher(namespace)' should yield the same result, regardless of order", () => {
            let dispatcher1 = new EventDispatcher("this is my name");
            let dispatcher2 = EventDispatcher.getInstance("this is my name");
            let dispatcher3 = EventDispatcher.getInstance("the bird is the word");
            let dispatcher4 = new EventDispatcher("the bird is the word");
            expect(dispatcher1).toBe(dispatcher2);
            expect(dispatcher3).toBe(dispatcher4);
            expect(dispatcher1).not.toBe(dispatcher3);
        });
        it("'EventDispatcher.getInstance()' should return 'EventDispatcher.getInstance(\"main\")'", () => {
            let dispatcher1 = EventDispatcher.getInstance();
            let dispatcher2 = EventDispatcher.getInstance("main");
            let dispatcher3 = new EventDispatcher("main");
            expect(dispatcher1).toBe(dispatcher2);
            expect(dispatcher2).toBe(dispatcher3);
            expect(dispatcher3).toBe(dispatcher1);
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnQtZGlzcGF0Y2hlci5zZXJ2aWNlLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc2VydmljZXMvZXZlbnQtZGlzcGF0Y2hlci5zZXJ2aWNlLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBRTdELFFBQVEsQ0FBQyxXQUFXLEVBQUUsR0FBRyxFQUFFO0lBQ3pCLFFBQVEsQ0FBQyxpQkFBaUIsRUFBRSxHQUFHLEVBQUU7UUFDL0IsSUFBSSxlQUFnQyxDQUFDO1FBRXJDLFVBQVUsQ0FBQyxHQUFHLEVBQUU7WUFDZCxlQUFlLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztZQUMvQixlQUFlLEdBQUcsSUFBSSxlQUFlLEVBQUUsQ0FBQztRQUMxQyxDQUFDLENBQUMsQ0FBQztRQUVILEVBQUUsQ0FBQyx5R0FBeUcsRUFBRSxHQUFHLEVBQUU7WUFDakgsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQzFCLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUMxQixJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDMUIsZUFBZSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDLENBQUM7WUFDdkMsZUFBZSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDLENBQUM7WUFDdkMsZUFBZSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDLENBQUM7WUFDdkMsZUFBZSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDLENBQUM7WUFDdkMsZUFBZSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDLENBQUM7WUFDdkMsZUFBZSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDLENBQUM7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RCxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ3RDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDdEMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDNUMsQ0FBQyxDQUFDLENBQUM7UUFFSCxFQUFFLENBQUMsdUZBQXVGLEVBQUUsR0FBRyxFQUFFO1lBQy9GLElBQUksV0FBVyxHQUFHLGVBQWUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUNoRCxJQUFJLFdBQVcsR0FBRyxlQUFlLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3RELElBQUksV0FBVyxHQUFHLElBQUksZUFBZSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBRzlDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDdEMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUN0QyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3hDLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyJ9