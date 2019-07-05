import {
    Riba,
} from '../index';

import {
    classStarBinder,
} from './class-star.binder';

const riba = new Riba();
riba.module.binderService.regist(classStarBinder);

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
                hasMyClass: true,
            },
        };
    });

    describe('class-*', () => {
        it('disables the element', () => {
            element.className = 'foobar';
            element.setAttribute('rv-class-myclass', 'class.hasMyClass');

            expect(element.className).toEqual('foobar');

            riba.bind(fragment, model);

            expect(element.className).toEqual('foobar myclass');

            model.class.hasMyClass = false;

            expect(element.className).toEqual('foobar');
        });
    });

});
