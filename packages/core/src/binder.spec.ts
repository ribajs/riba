import { jest } from '@jest/globals';
import { Riba, View, Binder } from "./index.js";
import { Data } from "../spec/lib/moch.data";
import { dotAdapter } from "./adapters/index.js";
import {
  TextBinder,
  HtmlBinder,
  EachStarBinder,
  ValueBinder,
  AddClassBinder
} from "./binders";
import { Formatter, Adapter } from "./types/index.js";

describe("riba.Binder", () => {

  const riba = new Riba();
  riba.module.adapter.regist(dotAdapter);
  riba.module.binder.regist(TextBinder);
  riba.module.binder.regist(HtmlBinder);
  riba.module.binder.regist(ValueBinder);
  riba.module.binder.regist(EachStarBinder);
  riba.module.binder.regist(AddClassBinder);

  let model: object;
  let el: HTMLElement;
  let view: View;
  let binding: TextBinder | ValueBinder;
  let originalPrefix: string[];
  let adapter: Adapter;
  let routineFn;

  beforeEach(() => {
    originalPrefix = riba.prefix;
    riba.prefix = ["data"];
    adapter = riba.adapters["."];

    el = document.createElement("div");
    el.setAttribute("data-text", "obj.name");

    view = riba.bind(el, { obj: { name: "test" } });
    binding = view.bindings[0] as TextBinder;
    model = binding.model;
  });

  afterEach(() => {
    riba.prefix = originalPrefix;
  });

  it("gets assigned the proper binder routine matching the identifier", () => {
    routineFn = binding.name;
    expect(routineFn).toEqual("text");
    expect(routineFn).toEqual(riba.binders.text.key);
  });

  describe("when bind to non configurable properties", () => {
    let data: any;
    beforeEach(() => {
      data = {
        name: "x",
        items: [],
      };
      Object.defineProperty(data, "name", {
        enumerable: true,
        configurable: false,
        writable: true,
        value: "y",
      });
      el.setAttribute("data-show", "obj.items.length");
    });

    it("does not throw", () => {
      expect(() => {
        riba.bind(el, { obj: data });
      }).not.toThrow();
    });
  });

  describe("with multiple prefixes", () => {
    beforeEach(() => {
      riba.prefix = ["foo", "bar", "any"];

      // Positive test
      el.setAttribute("foo-a", "'a'");
      el.setAttribute("bar-b", "'b'");
      el.setAttribute("any-c", "'c'");

      // Negative test
      el.setAttribute("rv-d", "'d'");
    });

    it("All prefixes should be applied", () => {
      expect(() => {
        riba.bind(el, {});
      }).not.toThrow();

      // Positive test
      expect(el.getAttribute('a')).toEqual('a');
      expect(el.getAttribute('b')).toEqual('b');
      expect(el.getAttribute('c')).toEqual('c');

      // Negative test
      expect(el.getAttribute('d')).toBeNull();

    });
  });

  describe("with formatters", () => {
    let valueInput: HTMLInputElement;

    beforeEach(() => {
      const awesomeFormatter = {
        name: "awesome",
        read: (value) => "awesome " + value,
      } as Formatter;

      const totallyFormatter = {
        name: "totally",
        read: (value, prefix) => prefix + " totally " + value,
      } as Formatter;

      const placeholderFormatter = {
        name: "and",
        read: (value, affix) => value + affix,
      } as Formatter;

      riba.module.formatter.regist(awesomeFormatter);
      riba.module.formatter.regist(totallyFormatter);
      riba.module.formatter.regist(placeholderFormatter, "and", true);
      riba.module.formatter.regist(placeholderFormatter, "radical", true);
      riba.module.formatter.regist(placeholderFormatter, "totally", true);
    });

    it("register all formatters", () => {
      valueInput = document.createElement("input");
      valueInput.setAttribute("type", "text");
      valueInput.setAttribute(
        "data-value",
        "obj.name | awesome | radical | totally"
      );

      view = riba.bind(valueInput, { obj: { name: "nothing" } });
      binding = view.bindings[0] as TextBinder;
      expect(binding.formatters).toEqual(["awesome", "radical", "totally"]);
    });

    it("allows arguments with pipes", () => {
      valueInput = document.createElement("input");
      valueInput.setAttribute("type", "text");
      valueInput.setAttribute(
        "data-value",
        `obj.name | awesome | totally 'arg | with || pipes' 'and more args' | and 'others formatters' with 'pi||pes'`
      );

      view = riba.bind(valueInput, { obj: { name: "nothing" } });
      binding = view.bindings[0] as TextBinder;

      expect(binding.formatters).toEqual([
        "awesome",
        `totally 'arg | with || pipes' 'and more args'`,
        `and 'others formatters' with 'pi||pes'`,
      ]);
    });
  });

  describe("bind()", () => {
    it("subscribes to the model for changes via the adapter", () => {
      jest.spyOn(adapter, "observe");
      binding._bind();
      expect(adapter.observe).toHaveBeenCalledWith(model, "name", binding);
    });

    it(`calls the binder's bind method if one exists`, () => {
      expect(() => {
        binding._bind();
      }).not.toThrow();

      binding.bind = () => {
        return;
      };
      jest.spyOn(binding, "bind");

      binding._bind();
      expect(binding.bind).toHaveBeenCalled();
    });

    describe("with preloadData set to true", () => {
      beforeEach(() => {
        riba.preloadData = true;
      });

      it("sets the initial value", () => {
        jest.spyOn(binding, "set");
        binding._bind();
        expect(binding.set).toHaveBeenCalledWith("test");
      });
    });
  });

  describe("unbind()", () => {
    describe("without a binder.unbind defined", () => {
      it("should not throw an error", () => {
        expect(() => {
          binding._unbind();
        }).not.toThrow();
      });
    });

    describe("with a binder.unbind defined", () => {
      beforeEach(() => {
        binding.unbind = () => {
          /**/
        };
      });

      it("should not throw an error", () => {
        expect(() => {
          binding._unbind();
        }).not.toThrow();
      });

      it(`calls the binder's unbind method`, () => {
        jest.spyOn(binding, "unbind");
        binding._unbind();
        expect(binding.unbind).toHaveBeenCalled();
      });
    });
  });

  describe("set()", () => {
    it("performs the binding routine with the supplied value", () => {
      routineFn = jest.spyOn(binding, "routine");

      binding.set("sweater");
      expect(routineFn).toHaveBeenCalledWith(el, "sweater");
    });

    it("applies any formatters to the value before performing the routine", () => {
      if (!view.options.formatters) {
        throw new Error("formatters are undefined!");
      }
      routineFn = jest.spyOn(binding, "routine");
      view.options.formatters.awesome = {
        name: "awesome",
        read(value: string) {
          return "awesome " + value;
        },
      };

      if (binding.formatters) {
        binding.formatters.push("awesome");
      }
      binding.set("sweater");

      expect(binding.routine).toHaveBeenCalledWith(
        el,
        "awesome sweater"
      );
    });
  });

  describe("publish()", () => {
    let numberInput: HTMLInputElement;
    it(`should publish the value of a number input`, () => {
      numberInput = document.createElement("input");
      numberInput.setAttribute("type", "number");
      numberInput.setAttribute("data-value", "obj.num");

      view = riba.bind(numberInput, { obj: { num: 42 } });
      binding = view.bindings[0] as TextBinder;
      model = binding.model;

      numberInput.value = "42";

      jest.spyOn(adapter, "set");
      binding.publish();
      expect(adapter.set).toHaveBeenCalledWith(model, "num", "42");
    });
  });

  describe("publishTwoWay()", () => {
    let numberInput;
    let valueInput;
    it("applies a two-way read formatter to function same as a single-way", () => {
      const awesomeFormatter = {
        read: (value) => "awesome " + value,
      } as Formatter;

      riba.module.formatter.regist(awesomeFormatter, "awesome");

      routineFn = jest.spyOn(binding, "routine");

      if (!binding.formatters) {
        throw new Error("Formatters not set!");
      }

      binding.formatters.push("awesome");

      binding.set("sweater");
      expect(routineFn).toHaveBeenCalledWith(el, "awesome sweater");
    });

    it(`should publish the value of a number input`, () => {
      // TODO remove any
      (riba.formatters.awesome as any) = {
        publish: (value: string) => "awesome " + value,
      };

      numberInput = document.createElement("input");
      numberInput.setAttribute("type", "number");
      numberInput.setAttribute("data-value", "obj.num | awesome");

      view = riba.bind(numberInput, { obj: { num: 42 } });
      binding = view.bindings[0] as TextBinder;
      model = binding.model;

      numberInput.value = "42";

      binding.publish();
      expect(adapter.set).toHaveBeenCalledWith(model, "num", "awesome 42");
    });

    it(`should format a value in both directions`, () => {
      // TODO remove any
      (riba.formatters.awesome as any) = {
        publish: (value: string) => "awesome " + value,
        read: (value: string) => value + " is awesome",
      };

      jest.spyOn(binding, "routine");

      valueInput = document.createElement("input");
      valueInput.setAttribute("type", "text");
      valueInput.setAttribute("data-value", "obj.name | awesome");

      view = riba.bind(valueInput, { obj: { name: "nothing" } });
      binding = view.bindings[0] as ValueBinder;
      model = binding.model;

      jest.spyOn(binding, "routine");

      valueInput.value = "charles";
      binding.publish();

      expect(binding.name).toEqual("value");

      expect(adapter.set).toHaveBeenCalledWith(
        model,
        "name",
        "awesome charles"
      );

      binding.set("fred");
      expect(binding.routine).toHaveBeenCalledWith(
        valueInput,
        "fred is awesome"
      );
    });

    it(`should resolve formatter arguments to their values`, () => {
      (riba.formatters.withArguments as Formatter) = {
        name: "withArguments",
        publish: (value, arg1, arg2) => {
          return value + ":" + arg1 + ":" + arg2;
        },
        read: (value, arg1, arg2) => {
          return value.replace(":" + arg1 + ":" + arg2, "");
        },
      };

      valueInput = document.createElement("input");
      valueInput.setAttribute("type", "text");
      valueInput.setAttribute(
        "data-value",
        `obj.name | withArguments config.age 'male'`
      );

      view = riba.bind(valueInput, {
        obj: {
          name: "nothing",
        },
        config: {
          age: 50,
        },
      });

      binding = view.bindings[0] as ValueBinder;
      jest.spyOn(binding, "routine");
      model = binding.model;

      expect(binding.name).toEqual("value");

      valueInput.value = "bobby";
      binding.publish();
      expect(adapter.set).toBeCalledWith(model, "name", "bobby:50:male");

      expect(valueInput.value).toEqual("bobby");

      binding.set("andy:50:male");
      expect(binding.routine).toBeCalledWith(valueInput, "andy");
    });

    it(`should resolve formatter arguments correctly with multiple formatters`, () => {
      (riba.formatters.wrap as Formatter) = {
        name: "wrap",
        publish: (value: string, arg1: string, arg2: string) => {
          return arg1 + value + arg2;
        },
        read: (value: string, arg1: string, arg2: string) => {
          return value.replace(arg1, "").replace(arg2, "");
        },
      };

      (riba.formatters.saveAsCase as Formatter) = {
        name: "saveAsCase",
        publish: (value, typeCase) => {
          return value["to" + typeCase + "Case"]();
        },
        read: (value, typeCase) => {
          return value[typeCase === "Upper" ? "toLowerCase" : "toUpperCase"]();
        },
      };

      valueInput = document.createElement("input");
      valueInput.setAttribute("type", "text");
      valueInput.setAttribute(
        "data-value",
        `obj.name | saveAsCase config.typeCase | wrap config.curly '}' | wrap config.square ']' | wrap config.paren ')'`
      );

      view = riba.bind(valueInput, {
        obj: {
          name: "nothing",
        },
        config: {
          paren: "(",
          square: "[",
          curly: "{",
          typeCase: "Upper",
        },
      });

      binding = view.bindings[0] as TextBinder;
      model = binding.model;

      jest.spyOn(binding, "routine");

      valueInput.value = "bobby";
      binding.publish();
      expect(adapter.set).toBeCalledWith(model, "name", "{[(BOBBY)]}");

      expect(valueInput.value).toEqual("bobby");

      binding.set("{[(ANDY)]}");
      expect(binding.routine).toBeCalledWith(valueInput, "andy");
    });

    it(`should not fail or format if the specified binding function doesn't exist`, () => {
      (riba.formatters.awesome as any) = {};
      valueInput = document.createElement("input");
      valueInput.setAttribute("type", "text");
      valueInput.setAttribute("data-value", "obj.name | awesome");

      view = riba.bind(valueInput, { obj: { name: "nothing" } });
      binding = view.bindings[0] as TextBinder;
      model = binding.model;

      jest.spyOn(binding, "routine");

      valueInput.value = "charles";
      binding.publish();
      expect(adapter.set).toBeCalledWith(model, "name", "charles");

      binding.set("fred");
      expect(binding.routine).toBeCalledWith(valueInput, "fred");
    });

    it(`should apply read binders left to right, and write binders right to left`, () => {
      (riba.formatters.totally as Formatter) = {
        name: "totally",
        publish: (value) => value + " totally",
        read: (value) => value + " totally",
      };

      (riba.formatters.awesome as Formatter) = {
        name: "awesome",
        publish: (value) => value + " is awesome",
        read: (value) => value + " is awesome",
      };

      valueInput = document.createElement("input");
      valueInput.setAttribute("type", "text");
      valueInput.setAttribute("data-value", "obj.name | awesome | totally");

      view = riba.bind(valueInput, { obj: { name: "nothing" } });
      binding = view.bindings[0] as TextBinder;
      model = binding.model;

      jest.spyOn(binding, "routine");

      binding.set("fred");
      expect(binding.routine).toBeCalledWith(
        valueInput,
        "fred is awesome totally"
      );

      valueInput.value = "fred";
      binding.publish();
      expect(adapter.set).toBeCalledWith(
        model,
        "name",
        "fred totally is awesome"
      );
    });

    it(`binders in a chain should be skipped if they're not there`, () => {
      (riba.formatters.totally as Formatter) = {
        name: "totally",
        publish: (value) => value + " totally",
        read: (value) => value + " totally",
      };

      (riba.formatters.radical as Formatter) = {
        name: "radical",
        publish: (value) => value + " is radical",
      };

      (riba.formatters.awesome as Formatter) = {
        name: "awesome",
        read: (value) => value + " is awesome",
      };

      valueInput = document.createElement("input");
      valueInput.setAttribute("type", "text");
      valueInput.setAttribute(
        "data-value",
        "obj.name | awesome | radical | totally"
      );

      view = riba.bind(valueInput, { obj: { name: "nothing" } });
      binding = view.bindings[0] as ValueBinder;
      jest.spyOn(binding, "routine");

      expect(binding.name).toEqual("value");
      model = binding.model;
 
      // TODO fixme
      // expect(binding.routine).toHaveBeenCalledWith(
      //   valueInput,
      //   "nothing is awesome totally"
      // );

      binding.set("fred");
      expect(binding.routine).toHaveBeenCalledWith(
        valueInput,
        "fred is awesome totally"
      );

      valueInput.value = "fred";
      binding.publish();
      expect(adapter.set).toHaveBeenCalledWith(
        model,
        "name",
        "fred totally is radical"
      );
    });
  });

  describe("formattedValue()", () => {
    it("applies the current formatters on the supplied value", () => {
      if (!view.options.formatters) {
        throw new Error("formatters are undefined!");
      }
      view.options.formatters.awesome = {
        name: "awesome",
        read(value: string) {
          return "awesome " + value;
        },
      };
      if (!binding.formatters) {
        throw new Error("Formatters not set!");
      }
      binding.formatters.push("awesome");
      expect(binding.formattedValue("hat")).toEqual("awesome hat");
    });

    describe("with a multi-argument formatter string", () => {
      beforeEach(() => {
        if (!view.options.formatters) {
          throw new Error("formatters are undefined!");
        }
        view.options.formatters.awesome = {
          name: "awesome",
          read(value: string, prefix: string) {
            return prefix + " awesome " + value;
          },
        };

        if (!binding.formatters) {
          throw new Error("Formatters not set!");
        }
        binding.formatters.push(`awesome 'super'`);
      });

      it("applies the formatter with arguments", () => {
        expect(binding.formattedValue("jacket")).toEqual(
          "super awesome jacket"
        );
      });
    });

    describe("with a formatter string with pipes in argument", () => {
      beforeEach(() => {
        if (!view.options.formatters) {
          throw new Error("formatters are undefined!");
        }
        view.options.formatters.totally = {
          name: "totally",
          read(value: string, prefix: string) {
            return prefix + " totally " + value;
          },
        };

        if (!binding.formatters) {
          throw new Error("Formatters not set!");
        }
        binding.formatters.push(`totally 'arg | with || pipes'`);
      });

      it("applies the formatter with arguments with pipes", () => {
        expect(binding.formattedValue("jacket")).toEqual(
          "arg | with || pipes totally jacket"
        );
      });
    });
  });

  describe("getValue()", () => {
    it("should use binder.getValue() if present", () => {
      binding.getValue = () => {
        return "foo";
      };

      expect(binding._getValue(el)).toEqual("foo");
    });

    it("binder.getValue() should have access to passed element", () => {
      binding.getValue = (_el: HTMLElement) => {
        return _el.dataset.foo;
      };

      el.dataset.foo = "bar";
      expect(binding._getValue(el)).toEqual("bar");
    });

    it("binder.getValue() should have access to binding", () => {
      binding.getValue = function () {
        return (this as any).foo;
      };

      (binding as any).foo = "bar";
      expect(binding._getValue(el)).toEqual("bar");
    });
  });
});

describe("Functional", () => {

  const riba = new Riba();
  riba.module.adapter.regist(dotAdapter);
  riba.module.binder.regist(TextBinder);
  riba.module.binder.regist(HtmlBinder);
  riba.module.binder.regist(ValueBinder);
  riba.module.binder.regist(EachStarBinder);
  riba.module.binder.regist(AddClassBinder);

  let data: Data;
  let bindData: { data: Data };
  let el: HTMLUnknownElement;
  let input: HTMLInputElement;
  let originalPrefix: string[];
  let adapter: Adapter;

  beforeEach(() => {
    originalPrefix = riba.prefix;
    riba.prefix = ["data"];
    adapter = {
      name: ":",
      observe: (obj, keypath, callback) => {
        obj.on(keypath, callback);
      },
      unobserve: (obj, keypath, callback) => {
        obj.off(keypath, callback);
      },
      get: (obj, keypath) => {
        return obj.get(keypath);
      },
      set: (obj, keypath, value) => {
        const attributes: { [keypath: string]: any } = {};
        attributes[keypath] = value;
        obj.set(attributes);
      },
    };
    riba.module.adapter.regist(adapter);
    riba.configure({ preloadData: true });

    data = new Data({
      foo: "bar",
      items: [{ name: "a" }, { name: "b" }],
    });

    bindData = { data };

    el = document.createElement("div");
    el.setAttribute("rv-value", "");
    input = document.createElement("input");
    input.setAttribute("type", "text");
  });

  afterEach(() => {
    riba.prefix = originalPrefix;
  });

  describe("Binds", () => {
    describe("Text", () => {
      it("should set the text content of the element", () => {
        el.setAttribute("data-text", "data:foo");
        riba.bind(el, bindData);
        expect(el.textContent).toEqual(data.get("foo"));
      });

      it("should correctly handle HTML in the content", () => {
        el.setAttribute("data-text", "data:foo");
        const value = "<b>Fail</b>";
        data.set({ foo: value });
        riba.bind(el, bindData);
        expect(el.textContent).toEqual(value);
      });
    });

    describe("HTML", () => {
      it("should set the html content of the element", () => {
        el.setAttribute("data-html", "data:foo");
        riba.bind(el, bindData);
        expect(el.textContent).toEqual(data.get("foo"));
      });

      it("should correctly handle HTML in the content", () => {
        el.setAttribute("data-html", "data:foo");
        const value = "<b>Fail</b>";
        data.set({ foo: value });
        riba.bind(el, bindData);
        expect(el.innerHTML).toEqual(value);
      });
    });

    describe("Value", () => {
      it("should set the value of the element", () => {
        input.setAttribute("data-value", "data:foo");
        riba.bind(input, bindData);
        expect(input.value).toEqual(data.get("foo"));
      });
    });

    describe("Multiple", () => {
      it("should bind a list of multiple elements", () => {
        el.setAttribute("data-html", "data:foo");
        input.setAttribute("data-value", "data:foo");
        riba.bind([el, input], bindData);
        expect(el.textContent).toEqual(data.get("foo"));
        expect(input.value).toEqual(data.get("foo"));
      });
    });

    describe("Priority", () => {
      let mockA: any; // TODO: jest.Mock<any, any>;
      let mockB: any; // TODO: jest.Mock<any, any>;
      let mockC: any; // TODO: jest.Mock<any, any>;
      let mockD: any; // TODO: jest.Mock<any, any>;
      let mockE: any; // TODO: jest.Mock<any, any>;
      let mockF: any; // TODO: jest.Mock<any, any>;
      let mockG: any; // TODO: jest.Mock<any, any>;
      beforeEach(() => {
        mockA = jest.fn();
        mockB = jest.fn();
        mockC = jest.fn();
        mockD = jest.fn();
        mockE = jest.fn();
        mockF = jest.fn();
        mockG = jest.fn();

        class ABinder extends Binder<any, any> {
          static key = "a";
          bind = mockA;
          routine() {
            /**/
          }
        }

        class BBinder extends Binder<any, any> {
          static key = "b";
          bind = mockB;
          routine() {
            /**/
          }
        }

        class CBinder extends Binder<any, any> {
          static key = "c";
          priority = 10;
          bind = mockC;
          routine() {
            /**/
          }
        }

        class DBinder extends Binder<any, any> {
          static key = "d";
          priority = 30;
          bind = mockD;
          routine() {
            /**/
          }
        }

        class EBinder extends Binder<any, any> {
          static key = "e";
          priority = 5;
          bind = mockE;
          routine() {
            /**/
          }
        }

        class FBinder extends Binder<any, any> {
          static key = "f";
          priority = 2;
          bind = mockF;
          routine() {
            /**/
          }
        }

        class GBinder extends Binder<any, any> {
          static key = "g";
          priority = 1;
          bind = mockG;
          routine() {
            /**/
          }
        }

        riba.module.binder.regist(ABinder);
        riba.module.binder.regist(BBinder);
        riba.module.binder.regist(CBinder);
        riba.module.binder.regist(DBinder);
        riba.module.binder.regist(EBinder);
        riba.module.binder.regist(FBinder);
        riba.module.binder.regist(GBinder);

        el.setAttribute("data-a", "data:foo");
        el.setAttribute("data-b", "data:foo");
        el.setAttribute("data-c", "data:foo");
        el.setAttribute("data-d", "data:foo");
        el.setAttribute("data-e", "data:foo");
        el.setAttribute("data-f", "data:foo");
        el.setAttribute("data-g", "data:foo");
      });

      describe("a:10, b:30", () => {
        beforeEach(() => {
          const view = riba.bind(el, bindData);
          const c = view.bindings[1];
          const d = view.bindings[0];
          expect(c.name).toEqual("c");
          expect(c.priority).toEqual(10);
          expect(d.name).toEqual("d");
          expect(d.priority).toEqual(30);
        });

        it("should bind d before c", () => {
          expect(mockD).toHaveBeenCalledBefore(mockC);
        });
      });

      describe("a:5, b:2", () => {
        beforeEach(() => {
          const view = riba.bind(el, bindData);
          const e = view.bindings[2];
          const f = view.bindings[3];
          expect(e.name).toEqual("e");
          expect(e.priority).toEqual(5);
          expect(f.name).toEqual("f");
          expect(f.priority).toEqual(2);
        });

        it("should bind e before f", () => {
          expect(mockE).toHaveBeenCalledBefore(mockF);
        });
      });

      describe("a:undefined, g:1", () => {
        beforeEach(() => {
          const view = riba.bind(el, bindData);
          const g = view.bindings[4];
          expect(g.name).toEqual("g");
          expect(g.priority).toEqual(1);
          riba.bind(el, bindData);
        });

        it("should bind g before a", () => {
          expect(mockG).toHaveBeenCalledBefore(mockA);
        });
      });
    });

    describe("Iteration", () => { 
      let listItem: HTMLLIElement;
      let list: HTMLUListElement;
      beforeEach(() => {
        list = document.createElement("ul");
        el.appendChild(list);
        listItem = document.createElement("li");
        listItem.setAttribute("data-each-item", "data:items");
        list.appendChild(listItem);
      });

      it("should loop over a collection and create new instances of that element + children", () => {
        expect(el.getElementsByTagName("li").length).toEqual(1);
        riba.bind(el, bindData);
        expect(el.getElementsByTagName("li").length).toEqual(2);
      });

      it("should not fail if the collection being bound to is null", () => {
        data.set({ items: null });
        riba.bind(el, bindData);
        expect(el.getElementsByTagName("li").length).toEqual(0);
      });

      it("should re-loop over the collection and create new instances when the array changes", () => {
        riba.bind(el, bindData);
        expect(el.getElementsByTagName("li").length).toEqual(2);

        const newItems = [{ name: "a" }, { name: "b" }, { name: "c" }];
        data.set({ items: newItems });
        expect(el.getElementsByTagName("li").length).toEqual(3);
      });

      it("should allow binding to the iterated item as well as any parent contexts", () => {
        const span1 = document.createElement("span");
        span1.setAttribute("data-text", "item.name");
        const span2 = document.createElement("span");
        span2.setAttribute("data-text", "data:foo");
        listItem.appendChild(span1);
        listItem.appendChild(span2);

        riba.bind(el, bindData);
        expect(el.getElementsByTagName("span")[0].textContent).toEqual("a");
        expect(el.getElementsByTagName("span")[1].textContent).toEqual("bar");
      });

      it("should allow binding to the iterated element directly", () => {
        listItem.setAttribute("data-text", "item.name");
        listItem.setAttribute("data-add-class", "data:foo");
        riba.bind(el, bindData);
        expect(el.getElementsByTagName("li")[0].textContent).toEqual("a");
        expect(el.getElementsByTagName("li")[0].className).toEqual("bar");
      });

      it("should insert items between any surrounding elements", () => {
        const firstItem = document.createElement("li");
        const lastItem = document.createElement("li");
        firstItem.textContent = "first";
        lastItem.textContent = "last";
        list.appendChild(lastItem);
        list.insertBefore(firstItem, listItem);
        listItem.setAttribute("data-text", "item.name");

        riba.bind(el, bindData);

        expect(el.getElementsByTagName("li")[0].textContent).toEqual("first");
        expect(el.getElementsByTagName("li")[1].textContent).toEqual("a");
        expect(el.getElementsByTagName("li")[2].textContent).toEqual("b");
        expect(el.getElementsByTagName("li")[3].textContent).toEqual("last");
      });

      // TODO fixme
      it.skip("should allow binding to the iterated element index", () => {
        listItem.setAttribute("data-index", "%item%");
        riba.bind(el, bindData);
        expect(el.getElementsByTagName("li")[0].getAttribute("index")).toEqual(
          "0"
        );
        expect(el.getElementsByTagName("li")[1].getAttribute("index")).toEqual(
          "1"
        );
      });

      // TODO fixme
      it.skip("should allow the developer to configure the index attribute available in the iteration", () => {
        listItem.setAttribute("data-index", "itemIndex");
        listItem.setAttribute("index-property", "itemIndex");
        riba.bind(el, bindData);
        expect(el.outerHTML).toEqual(""); // debug
        expect(el.getElementsByTagName("li")[0].getAttribute("index")).toEqual(
          "0"
        );
        expect(el.getElementsByTagName("li")[1].getAttribute("index")).toEqual(
          "1"
        );
      });
    });
  });

  describe("Updates", () => {
    it("should change the value", () => {
      el.setAttribute("data-text", "data:foo");
      riba.bind(el, bindData);
      data.set({ foo: "some new value" });
      expect(el.textContent).toEqual(data.get("foo"));
    });
  });

  describe("Input", () => {
    it("should update the model value", () => {
      input.setAttribute("data-value", "data:foo");
      riba.bind(input, bindData);
      input.value = "some new value";
      const event = document.createEvent("HTMLEvents");
      event.initEvent("input", true, true);
      input.dispatchEvent(event);
      expect(data.get("foo")).toEqual("some new value");
    });

    it("should allow to change the event listened", () => {
      let event;
      input.setAttribute("data-value", "data:foo");
      input.setAttribute("event-name", "blur");
      riba.bind(input, bindData);
      input.value = "some new value";
      event = document.createEvent("HTMLEvents");
      event.initEvent("input", true, true);
      input.dispatchEvent(event);
      expect(data.get("foo")).toEqual("bar");

      event = document.createEvent("HTMLEvents");
      event.initEvent("blur", true, true);
      input.dispatchEvent(event);
      expect(data.get("foo")).toEqual("some new value");
    });
  });
});
