import {
    Riba,
} from '../index';

import {
    assignBinder,
} from './assign.binder';

const riba = new Riba();
riba.module.binderService.regist(assignBinder);

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
        it('Set\'s a value to the model', () => {
            element.setAttribute('rv-assign', '{"newValue": "hello"}');

            expect(model).toEqual({value: 'world'});

            riba.bind(fragment, model);

            expect(model).toEqual({value: 'world', newValue: 'hello'});
        });
    });

});
