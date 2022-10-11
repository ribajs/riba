import { Riba } from "../riba.js";
import { dotAdapter } from "../adapters/dot.adapter.js";
import { UnlessBinder } from "./unless.binder.js";
import { EachStarBinder } from "./each-item.binder.js";

describe("unless", () => {
  const riba = new Riba();
  riba.module.adapter.register(dotAdapter);
  riba.module.binder.register(UnlessBinder);

  let el: HTMLDivElement;
  let model: any;
  let fragment: DocumentFragment;

  beforeEach(() => {
    fragment = document.createDocumentFragment();
    el = document.createElement("div");
    el.setAttribute("rv-unless", "data.show");
    el.innerHTML = "{ data.count }";

    fragment.appendChild(el);

    model = {
      data: {
        show: false,
        count: 1,
      },
    };
  });

  it("Removes element with bound key inside if the value is true", () => {
    riba.bind(fragment, model);

    model.data.show = true;

    // 1 for the comment placeholder
    expect(fragment.childNodes.length).toEqual(1);
  });

  it("Shows if the value is false", () => {
    riba.bind(fragment, model);

    model.data.show = false;

    // one child for the original div plus 1 for the comment placeholder
    expect(fragment.childNodes).toHaveLength(2);
    expect((fragment.childNodes[1] as Element).innerHTML).toEqual("1");
  });

  it("Removes when element becomes remove again", () => {
    riba.bind(fragment, model);

    model.data.show = false;
    model.data.count = 2;
    model.data.show = true;

    // 1 for the comment placeholder
    expect(fragment.childNodes.length).toEqual(1);
  });

  it("Shows if the value is falsey - zero", () => {
    riba.bind(fragment, model);

    model.data.show = 0;

    // one child for the original div plus 1 for the comment placeholder
    expect(fragment.childNodes).toHaveLength(2);
    expect((fragment.childNodes[1] as Element).innerHTML).toEqual("1");
  });

  it("Shows if the value is falsey - empty string", () => {
    riba.bind(fragment, model);

    model.data.show = "";

    // one child for the original div plus 1 for the comment placeholder
    expect(fragment.childNodes).toHaveLength(2);
    expect((fragment.childNodes[1] as Element).innerHTML).toEqual("1");
  });

  it("Shows if the value is falsey - undefined", () => {
    riba.bind(fragment, model);

    model.data.show = undefined;

    // one child for the original div plus 1 for the comment placeholder
    expect(fragment.childNodes).toHaveLength(2);
    expect((fragment.childNodes[1] as Element).innerHTML).toEqual("1");
  });

  it("Rebindes nested unless", () => {
    const nestedEl = document.createElement("div");
    nestedEl.setAttribute("rv-unless", "data.showNested");
    nestedEl.innerHTML = "{ data.countNested }";
    el.appendChild(nestedEl);

    riba.bind(fragment, model);

    model.data.countNested = "1";
    model.data.showNested = false;
    expect(nestedEl.innerHTML).toEqual("1");
    model.data.show = true;
    model.data.show = false;
    model.data.countNested = "42";

    expect(nestedEl.innerHTML).toEqual("42");
  });

  it("Respects nested if state after rebind", () => {
    const nestedEl = document.createElement("div");
    nestedEl.setAttribute("rv-unless", "data.showNested");
    el.appendChild(nestedEl);

    model.data.show = false;

    riba.bind(fragment, model);

    model.data.showNested = false;
    expect(el.contains(nestedEl)).toBeTruthy();
    model.data.show = true;
    model.data.showNested = true;
    model.data.show = false;
    expect(el.contains(nestedEl)).toBeFalsy();
  });

  it("Does not throw when root scope is reset", () => {
    el.setAttribute("rv-unless", "scope.error.errors");
    el.innerHTML = "<div>{scope.error.errors.email}</div>";
    model = {
      scope: {
        error: {
          errors: {
            email: "not a valid address",
          },
        },
      },
    };

    const resetRootScope = jest.fn(() => {
      model.scope.error = {};
      return;
    });
    riba.bind(el, model);
    resetRootScope();
    expect(resetRootScope).toHaveReturned();
  });
});

describe("Array observe and unobserve", () => {
  const riba = new Riba();
  riba.module.binder.register(EachStarBinder);

  let fragment: DocumentFragment;
  let el1: HTMLDivElement;
  let elEach: HTMLDivElement;
  let el2: HTMLDivElement;
  let el3: HTMLDivElement;
  let model: any;

  beforeEach(() => {
    /*
          DOM for test
          <div>
            <div rv-unless='scope.visible'>
              <div>
                <div rv-each-item='scope.items'>{item.data}</div>
              </div>
            </div>
            <div>
              <div rv-each-item='scope.items'>{item.data}</div>
            </div>
          </div>
        */
    // fragment = document.createElement('div');
    fragment = document.createDocumentFragment();
    el1 = document.createElement("div");
    el1.setAttribute("rv-unless", "scope.hidden");
    el2 = document.createElement("div");
    elEach = document.createElement("div");
    elEach.setAttribute("rv-each-item", "scope.items");
    elEach.innerHTML = "{item.data}";
    el2.appendChild(elEach);
    el1.appendChild(el2);
    el3 = document.createElement("div");
    elEach = document.createElement("div");
    elEach.setAttribute("rv-each-item", "scope.items");
    elEach.innerHTML = "{item.data}";
    el3.appendChild(elEach);
    fragment.appendChild(el1);
    fragment.appendChild(el3);

    model = { scope: { items: [], hidden: false } };
  });

  it("Observes array changes after another array binding is unbound", () => {
    riba.bind(fragment, model);
    model.scope.items.push({ data: "data" });
    expect(el3.childNodes.length).toEqual(2);
    model.scope.items.push({ data: "data" });
    expect(el3.childNodes.length).toEqual(3);
    model.scope.hidden = true;
    model.scope.items.push({ data: "data" });
    expect(el3.childNodes.length).toEqual(4);
  });
});
