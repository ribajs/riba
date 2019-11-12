import {
    Riba,
} from '../riba';

import {
    ifBinder,
} from './if.binder';

import {
    eachStarBinder,
} from './each-item.binder';

import {
    dotAdapter,
} from '../adapters/dot.adapter';

describe('if', () => {
    const riba = new Riba();
    riba.module.adapter.regist(dotAdapter);
    riba.module.binder.regist(ifBinder);

    let el: HTMLDivElement;
    let model: any;
    let fragment: DocumentFragment;

    beforeEach(() => {
        fragment = document.createDocumentFragment();
        el = document.createElement('div');
        el.setAttribute('rv-if', 'data.show');
        el.innerHTML = '{ data.count }';

        fragment.appendChild(el);

        model = {
            data: {
                show: true,
                count: 1,
            },
        };
    });

    it('shows element with bound key inside if the value is true', () => {
        riba.bind(fragment, model);

        // one child for the original div plus 1 for the comment placeholder
        expect(fragment.childNodes).toHaveLength(2);
        expect((fragment.childNodes[1] as Element).innerHTML).toEqual('1');
    });

    it('hides if the value is false', () => {
        riba.bind(fragment, model);

        model.data.show = false;

        // 1 for the comment placeholder
        expect(fragment.childNodes.length).toEqual(1);
    });

    it('keeps binding when element becomes visible again', () => {
        riba.bind(fragment, model);

        model.data.show = false;
        model.data.count = 2;
        model.data.show = true;

        // one child for the original div plus 1 for the comment placeholder
        expect(fragment.childNodes).toHaveLength(2);
        expect((fragment.childNodes[1] as Element).innerHTML).toEqual('2');
    });

    it('hides if the value is falsey - zero', () => {
        riba.bind(fragment, model);

        model.data.show = 0;
        // 1 for the comment placeholder
        expect(fragment.childNodes.length).toEqual(1);
    });

    it('hides if the value is falsey - empty string', () => {
        riba.bind(fragment, model);

        model.data.show = '';
        // 1 for the comment placeholder
        expect(fragment.childNodes.length).toEqual(1);
    });

    it('hides if the value is falsey - undefined', () => {
        riba.bind(fragment, model);

        model.data.show = undefined;
        // 1 for the comment placeholder
        expect(fragment.childNodes.length).toEqual(1);
    });

    it('rebindes nested if', () => {
        const nestedEl = document.createElement('div');
        nestedEl.setAttribute('rv-if', 'data.showNested');
        nestedEl.innerHTML = '{ data.countNested }';
        el.appendChild(nestedEl);

        riba.bind(fragment, model);

        model.data.countNested = '1';
        model.data.showNested = true;
        expect(nestedEl.innerHTML).toEqual('1');
        model.data.show = false;
        model.data.show = true;
        model.data.countNested = '42';

        expect(nestedEl.innerHTML).toEqual('42');
    });

    it('respects nested if state after rebind', () => {
        const nestedEl = document.createElement('div');
        nestedEl.setAttribute('rv-if', 'data.showNested');
        el.appendChild(nestedEl);

        riba.bind(fragment, model);

        model.data.showNested = true;
        expect(el.contains(nestedEl)).toBeTruthy();
        model.data.show = false;
        model.data.showNested = false;
        model.data.show = true;
        expect(el.contains(nestedEl)).toBeFalsy();
    });

    it('does not throw when root scope is reset', () => {
        el.setAttribute('rv-if', 'scope.error.errors');
        el.innerHTML = '<div>{scope.error.errors.email}</div>';
        model = {
            scope: {
                error: {
                    errors: {
                        email: 'not a valid address',
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

describe('Array observe and unobserve', () => {
    const riba = new Riba();
    riba.module.binder.regist(eachStarBinder);

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
            <div rv-if='scope.visible'>
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
        el1 = document.createElement('div');
        el1.setAttribute('rv-if', 'scope.visible');
        el2 = document.createElement('div');
        elEach = document.createElement('div');
        elEach.setAttribute('rv-each-item', 'scope.items');
        elEach.innerHTML = '{item.data}';
        el2.appendChild(elEach);
        el1.appendChild(el2);
        el3 = document.createElement('div');
        elEach = document.createElement('div');
        elEach.setAttribute('rv-each-item', 'scope.items');
        elEach.innerHTML = '{item.data}';
        el3.appendChild(elEach);
        fragment.appendChild(el1);
        fragment.appendChild(el3);

        model = { scope: { items: [], visible: true } };
    });

    it('observes array changes after another array binding is unbound', () => {
        riba.bind(fragment, model);
        model.scope.items.push({ data: 'data' });
        expect(el3.childNodes.length).toEqual(2);
        model.scope.items.push({ data: 'data' });
        expect(el3.childNodes.length).toEqual(3);
        model.scope.visible = false;
        model.scope.items.push({ data: 'data' });
        expect(el3.childNodes.length).toEqual(4);
    });
});
