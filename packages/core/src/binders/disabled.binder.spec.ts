import {
    Riba,
} from '../index';

import {
    disabledBinder,
} from './disabled.binder';

const riba = new Riba();
riba.module.binderService.regist(disabledBinder);

describe('riba.binders', () => {
    let button: HTMLButtonElement;

    beforeEach(() => {
        riba.configure({
            adapter: {
                subscribe: () => {/**/},
                unsubscribe: () => {/**/},
                read: () => {/**/},
                publish: () => {/**/},
            },
        });

        button = document.createElement('button');
        document.body.appendChild(button);

    });

    afterEach(() => {
        if (!button.parentNode) {
            throw new Error('button.parentNode is not defined!');
        }
        button.parentNode.removeChild(button);
    });

    describe('disabled', () => {
        describe('with a truthy value', () => {
            it('disables the element', () => {
                (riba.binders.disabled as any).routine(button, true);
                expect(button.disabled).toEqual(true);
            });
        });

        describe('with a falsey value', () => {
            it('enables the element', () => {
                (riba.binders.disabled as any).routine(button, false);
                expect(button.disabled).toEqual(false);
            });
        });
    });
});
