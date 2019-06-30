import {
    Riba,
} from '../index';

import {
    showBinder,
} from './show.binder';

const riba = new Riba();
riba.module.binderService.regist(showBinder);

describe('riba.binders', () => {
    let el: HTMLUnknownElement;

    beforeEach(() => {
        riba.configure({
            adapter: {
                subscribe: () => {/**/},
                unsubscribe: () => {/**/},
                read: () => {/**/},
                publish: () => {/**/},
            },
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
