import {
    Riba,
} from '../riba';

import {
    dotAdapter,
} from '../adapters/dot.adapter';

import {
    assignPropertyBinder,
} from './assign-property.binder';

const riba = new Riba();
riba.module.adapter.regist(dotAdapter);
riba.module.binder.regist(assignPropertyBinder);

describe('riba.binders', () => {
    let element: HTMLDivElement;
    let fragment: DocumentFragment;
    let model: any = {};

    beforeEach(() => {
        fragment = document.createDocumentFragment();
        element = document.createElement('div');
        fragment.appendChild(element);

        model = {
            value: 'world',
        };
    });

    describe('assign-*', () => {
        it('Set\'s a value to the model given as a value and property name', () => {
            element.setAttribute('rv-assign-new', '"hello"');

            expect(model).toEqual({value: 'world'});

            riba.bind(fragment, model);

            expect(model).toEqual({value: 'world', new: 'hello'});
        });
    });

});
