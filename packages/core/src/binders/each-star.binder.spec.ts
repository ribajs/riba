import {
  Riba,
} from '../riba';

import {
  eachStarBinder,
} from './each-star.binder';

import {
  textBinder,
} from './text.binder';

describe('each-*', () => {
  const riba = new Riba();
  riba.module.binder.regist(eachStarBinder);
  riba.module.binder.regist(textBinder);

  let fragment: DocumentFragment;
  let el: HTMLLIElement;
  let model: any;

  beforeEach(() => {
    fragment = document.createDocumentFragment();
    el = document.createElement('li');
    el.setAttribute('rv-each-item', 'items');
    el.setAttribute('rv-text', 'item.val');

    fragment.appendChild(el);

    model = { items: [{ val: 0 }, { val: 1 }, { val: 2 }] };
  });

  it('binds to the model creating a list item for each element in items', () => {
    riba.bind(fragment, model);

    // one child for each element in the model plus 1 for the comment placeholder
    expect(fragment.childNodes.length).toBe(model.items.length + 1);
  });

  it('reflects changes to the model into the DOM', () => {
    riba.bind(fragment, model);

    expect(fragment.childNodes[1].textContent).toBe('0');

    model.items[0].val = 'howdy';
    expect(fragment.childNodes[1].textContent).toBe('howdy');
  });

  it('reflects changes to the model into the DOM after unbind/bind', () => {
    const view = riba.bind(fragment, model);
    expect(fragment.childNodes[1].textContent as string).toBe('0');

    view.unbind();
    view.bind();
    model.items[0].val = 'howdy';
    expect(fragment.childNodes[1].textContent as string).toBe('howdy');
  });

  it('lets you push an item', () => {
    riba.bind(fragment, model);
    const originalLength = model.items.length;

    // one child for each element in the model plus 1 for the comment placeholder
    expect(fragment.childNodes.length).toBe(model.items.length + 1);

    model.items.push({ val: 3 });
    expect(model.items.length).toBe(originalLength + 1);
    expect(fragment.childNodes.length).toBe(model.items.length + 1);
  });

  it('lets you pop an item', () => {
    riba.bind(fragment, model);
    const originalLength = model.items.length;

    // one child for each element in the model plus 1 for the comment placeholder
    expect(fragment.childNodes.length).toBe(model.items.length + 1);
    [].forEach.call(fragment.childNodes, (itemEl: any, index: number) => {
      itemEl._key = index;
    });

    model.items.pop();
    expect(model.items.length).toBe(originalLength - 1);
    expect(fragment.childNodes.length).toBe(model.items.length + 1);
    expect(Array.prototype.indexOf.call(fragment.childNodes, fragment.childNodes[1])).toBe(1);
    expect((fragment.childNodes[1] as any)._key).toBe(1);
    expect(Array.prototype.indexOf.call(fragment.childNodes, fragment.childNodes[2])).toBe(2);
    expect((fragment.childNodes[2] as any)._key).toBe(2);
  });

  it('lets you shift an item', () => {
    riba.bind(fragment, model);
    const originalLength = model.items.length;

    // one child for each element in the model plus 1 for the comment placeholder
    expect(fragment.childNodes.length).toBe(model.items.length + 1);
    [].forEach.call(fragment.childNodes, (itemEl: any, index: number) => {
      itemEl._key = index;
    });

    model.items.shift();
    expect(model.items.length).toBe(originalLength - 1);
    expect(fragment.childNodes.length).toBe(model.items.length + 1);
    expect((fragment.childNodes[1] as any)._key).toBe(2);
    expect((fragment.childNodes[2] as any)._key).toBe(3);
  });

  it('lets you splice an item', () => {
    riba.bind(fragment, model);
    const originalLength = model.items.length;

    // one child for each element in the model plus 1 for the comment placeholder
    expect(fragment.childNodes.length).toBe(model.items.length + 1);
    [].forEach.call(fragment.childNodes, (itemEl: any, index: number) => {
      itemEl._key = index;
    });

    model.items.splice(1, 1, { val: 'x' }, { val: 'y' });
    expect(model.items.length).toBe(originalLength + 1);
    expect(fragment.childNodes.length).toBe(model.items.length + 1);
    expect((fragment.childNodes[1] as any)._key).toBe(1);
    expect(typeof (fragment.childNodes[2] as any)._key).toEqual('undefined');
    expect(typeof (fragment.childNodes[3] as any)._key).toEqual('undefined');
    expect((fragment.childNodes[4] as any)._key).toBe(3);
  });

  it('lets you push an item after unbind/bind', () => {
    const view = riba.bind(fragment, model);
    const originalLength = model.items.length;

    // one child for each element in the model plus 1 for the comment placeholder
    expect(fragment.childNodes.length).toBe(model.items.length + 1);

    view.unbind();
    view.bind();

    model.items.push({ val: 3 });
    expect(model.items.length).toBe(originalLength + 1);
    expect(fragment.childNodes.length).toBe(model.items.length + 1);
  });
});

describe('nested-each-*', () => {
  const riba = new Riba();
  riba.module.binder.regist(eachStarBinder);

  let fragment: DocumentFragment;
  let el: HTMLSpanElement;
  let nestedEl: HTMLSpanElement;
  let model: any;

  beforeEach(() => {
    fragment = document.createDocumentFragment();
    el = document.createElement('span');
    el.setAttribute('rv-each-item', 'items');
    nestedEl = document.createElement('span');
    nestedEl.setAttribute('rv-each-nested', 'item.items');
    el.appendChild(nestedEl);
    fragment.appendChild(el);

    model = {
      root: 'Root Node',
      items: [
        {name: 'Level 1 - 0', items: [{val: 0}, {val: 1}]},
        {name: 'Level 1 - 1', items: [{val: 2}, {val: 3}]},
        {name: 'Level 1 - 2', items: [{val: 4}, {val: 5}]},
      ],
    };
  });

  it('lets you access index from current and parent scope', () => {
    nestedEl.textContent = '{$parent.%item%}-{%nested%}';
    riba.bind(el, model);

    expect(fragment.childNodes[1].childNodes[1].textContent).toEqual('0-0');
    expect(fragment.childNodes[1].childNodes[2].textContent).toEqual('0-1');
    expect(fragment.childNodes[2].childNodes[2].textContent).toEqual('1-1');
  });

  /**
   * Overwrite the index property name on element and the nested element,
   * both to `$index` and access both with the parent scope
   */
  it('lets you access overwritten index from current and parent scope with the same name', () => {
    el.setAttribute('index-property', '$index');
    nestedEl.setAttribute('index-property', '$index');
    nestedEl.textContent = '{$parent.$index}-{$index}';
    riba.bind(el, model);

    expect(fragment.childNodes[1].childNodes[1].textContent).toEqual('0-0');
    expect(fragment.childNodes[1].childNodes[2].textContent).toEqual('0-1');
    expect(fragment.childNodes[2].childNodes[2].textContent).toEqual('1-1');
  });

  it('lets you access properties from parent scopes', () => {
    nestedEl.textContent = '{root}!{item.name}';
    riba.bind(el, model);

    expect(fragment.childNodes[1].childNodes[1].textContent).toEqual('Root Node!Level 1 - 0');
    expect(fragment.childNodes[1].childNodes[2].textContent).toEqual('Root Node!Level 1 - 0');
    expect(fragment.childNodes[2].childNodes[2].textContent).toEqual('Root Node!Level 1 - 1');
  });

  it('reflects changes in parent scopes properties', () => {
    nestedEl.textContent = '{root}!{item.name}';
    riba.bind(el, model);
    model.root = 'New';
    expect(fragment.childNodes[1].childNodes[1].textContent).toEqual('New!Level 1 - 0');
    expect(fragment.childNodes[1].childNodes[2].textContent).toEqual('New!Level 1 - 0');
    expect(fragment.childNodes[2].childNodes[2].textContent).toEqual('New!Level 1 - 1');
  });

  it('reflects changes when an undefined property is set in root scope', () => {
    nestedEl.textContent = '{unset}';
    riba.bind(el, model);
    model.unset = 'NotUndefined';
    expect(fragment.childNodes[1].childNodes[1].textContent).toEqual('NotUndefined');
    expect(fragment.childNodes[1].childNodes[2].textContent).toEqual('NotUndefined');
    expect(fragment.childNodes[2].childNodes[2].textContent).toEqual('NotUndefined');
  });

});
