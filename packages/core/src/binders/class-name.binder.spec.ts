import {
    Riba,
} from '../riba';

import {
    classStarBinder,
} from './class-name.binder';

import {
    dotAdapter,
} from '../adapters/dot.adapter';

const riba = new Riba();
riba.module.adapter.regist(dotAdapter);
riba.module.binder.regist(classStarBinder);

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
        it('Adds or removes the class name passed as star parameter', () => {
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
