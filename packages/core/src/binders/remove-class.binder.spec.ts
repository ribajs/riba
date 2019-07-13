import {
    Riba,
} from '../index';

import {
    removeClassBinder,
} from './remove-class.binder';

const riba = new Riba();
riba.module.binder.regist(removeClassBinder);

describe('riba.binders', () => {
    let element: HTMLDivElement;
    let fragment: DocumentFragment;
    let model: any = {};

    beforeEach(() => {
        fragment = document.createDocumentFragment();
        element = document.createElement('div');
        fragment.appendChild(element);

        model = {
            class: {
                remove: 'remove-me',
            },
        };
    });

    describe('remove-class', () => {
        it('Removes a class by a value string in the model', () => {
            element.className = 'foobar remove-me';
            element.setAttribute('rv-remove-class', 'class.remove');

            expect(element.className).toEqual('foobar remove-me');

            riba.bind(fragment, model);

            expect(element.className).toEqual('foobar');

            model.class.remove = 'foobar';

            expect(element.className).toEqual('');
        });
    });

});
