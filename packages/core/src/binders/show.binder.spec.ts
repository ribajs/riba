import {
    Riba,
} from '../index';

import {
    showBinder,
} from './show.binder';

import { Adapters } from '../interfaces';

const riba = new Riba();
riba.module.binder.regist(showBinder);

describe('riba.binders', () => {
    let el: HTMLUnknownElement;

    beforeEach(() => {
        riba.configure({
            adapters: {
                subscribe: () => {/**/},
                unsubscribe: () => {/**/},
                read: () => {/**/},
                publish: () => {/**/},
            } as unknown as Adapters,
        });

        el = document.createElement('div');
        document.body.appendChild(el);
    });

    afterEach(() => {
        if (!el.parentNode) {
            throw new Error('el.parentNode is not defined!');
        }
        el.parentNode.removeChild(el);
    });

    describe('show', () => {
        describe('with a truthy value', () => {
            it('shows the element', () => {
                (riba.binders.show as any).routine(el, true);
                expect(el.style.display).toEqual('');
            });
        });

        describe('with a falsey value', () => {
            it('hides the element', () => {
                (riba.binders.show as any).routine(el, false);
                expect(el.style.display).toEqual('none');
            });
        });
    });
});
