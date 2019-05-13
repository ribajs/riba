import {
  Riba,
} from '../riba';

import {
  eachStarBinderWrapper,
} from './each-star.binder';

import {
  text,
} from './text.binder';

describe('each-*', () => {
  const riba = new Riba();
  riba.module.binderService.regist(eachStarBinderWrapper());
  riba.module.binderService.regist(text, 'text');
  let fragment: DocumentFragment;
  let el;
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
    const view = riba.bind(fragment, model);

    // one child for each element in the model plus 1 for the comment placeholder
    expect(fragment.childNodes.length).should.exactly(model.items.length + 1);
  });

  it('reflects changes to the model into the DOM', () => {
    const view = riba.bind(fragment, model);

    expect(fragment.childNodes[1].textContent).should.be.exactly('0');

    model.items[0].val = 'howdy';
    (fragment.childNodes[1].textContent).should.be.exactly('howdy');
  });

  it('reflects changes to the model into the DOM after unbind/bind', () => {
    const view = riba.bind(fragment, model);
    expect(fragment.childNodes[1].textContent as string).should.be.exactly('0');

    view.unbind();
    view.bind();
    model.items[0].val = 'howdy';
    expect(fragment.childNodes[1].textContent as string).should.be.exactly('howdy');
  });

  it('lets you push an item', () => {
    const view = riba.bind(fragment, model);
    const originalLength = model.items.length;

    // one child for each element in the model plus 1 for the comment placeholder
    expect(fragment.childNodes.length).should.be.exactly(model.items.length + 1);

    model.items.push({ val: 3 });
    expect(model.items.length).should.exactly(originalLength + 1);
    expect(fragment.childNodes.length).should.be.exactly(model.items.length + 1);
  });

  it('lets you pop an item', () => {
    const view = riba.bind(fragment, model);
    const originalLength = model.items.length;

    // one child for each element in the model plus 1 for the comment placeholder
    expect(fragment.childNodes.length).should.exactly(model.items.length + 1);
    [].forEach.call(fragment.childNodes, (itemEl: any, index: number) => {
      itemEl._key = index;
    });

    model.items.pop();
    expect(model.items.length).should.exactly(originalLength - 1);
    expect(fragment.childNodes.length).should.exactly(model.items.length + 1);
    expect(Array.prototype.indexOf.call(fragment.childNodes, fragment.childNodes[1])).should.exactly(1);
    expect((fragment.childNodes[1] as any)._key).should.exactly(1);
    expect(Array.prototype.indexOf.call(fragment.childNodes, fragment.childNodes[2])).should.exactly(2);
    expect((fragment.childNodes[2] as any)._key).should.exactly(2);
  });

  it('lets you shift an item', () => {
    const view = riba.bind(fragment, model);
    const originalLength = model.items.length;

    // one child for each element in the model plus 1 for the comment placeholder
    expect(fragment.childNodes.length).should.exactly(model.items.length + 1);
    [].forEach.call(fragment.childNodes, (itemEl: any, index: number) => {
      itemEl._key = index;
    });

    model.items.shift();
    (model.items.length).should.exactly(originalLength - 1);
    (fragment.childNodes.length).should.exactly(model.items.length + 1);
    ((fragment.childNodes[1] as any)._key).should.exactly(2);
    ((fragment.childNodes[2] as any)._key).should.exactly(3);
  });

  it('lets you splice an item', () => {
    const view = riba.bind(fragment, model);
    const originalLength = model.items.length;

    // one child for each element in the model plus 1 for the comment placeholder
    (fragment.childNodes.length).should.exactly(model.items.length + 1);
    [].forEach.call(fragment.childNodes, (itemEl: any, index: number) => {
      itemEl._key = index;
    });

    model.items.splice(1, 1, { val: 'x' }, { val: 'y' });
    (model.items.length).should.exactly(originalLength + 1);
    (fragment.childNodes.length).should.exactly(model.items.length + 1);
    ((fragment.childNodes[1] as any)._key).should.exactly(1);
    (typeof (fragment.childNodes[2] as any)._key).should.be.equal('undefined');
    (typeof (fragment.childNodes[3] as any)._key).should.be.equal('undefined');
    ((fragment.childNodes[4] as any)._key).should.exactly(3);
  });

  it('lets you push an item after unbind/bind', () => {
    const view = riba.bind(fragment, model);
    const originalLength = model.items.length;

    // one child for each element in the model plus 1 for the comment placeholder
    (fragment.childNodes.length).should.exactly(model.items.length + 1);

    view.unbind();
    view.bind();

    model.items.push({ val: 3 });
    (model.items.length).should.exactly(originalLength + 1);
    (fragment.childNodes.length).should.exactly(model.items.length + 1);
  });
});
