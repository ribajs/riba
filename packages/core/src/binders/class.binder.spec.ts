import {
    Riba,
} from '../index';

import {
    classBinder,
} from './class.binder';

const riba = new Riba();
riba.module.binderService.regist(classBinder);

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
                add: 'add-me',
            },
        };
    });

    describe('class', () => {
        it('Adds a class by a value string in the model', () => {
            element.className = 'foobar';
            element.setAttribute('rv-class', 'class.add');

            expect(element.className).toEqual('foobar');

            riba.bind(fragment, model);

            expect(element.className).toEqual('foobar add-me');

            model.class.add = 'add-me-too';

            expect(element.className).toEqual('foobar add-me-too');
        });
    });

});
