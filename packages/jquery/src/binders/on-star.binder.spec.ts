import {
    Riba,
} from '@ribajs/core';

import {
    onStarBinder,
} from './on-star.binder';

const riba = new Riba();
riba.module.binder.regist(onStarBinder);

describe('riba.binders', () => {
    let element: HTMLDivElement;
    let fragment: DocumentFragment;
    let model: any = {};

    beforeEach(() => {
        fragment = document.createDocumentFragment();
        element = document.createElement('div');
        fragment.appendChild(element);

        model = {};
    });

    describe('on-*', () => {
        it('on-click: Watch\'s a click event', () => {
            element.className = 'foobar remove-me';
            model.onClick = jest.fn();
            element.setAttribute('rv-on-click', 'onClick');
            riba.bind(fragment, model);

            // Simulates the click
            element.click();
            expect(model.onClick).toHaveBeenCalled();
        });
    });

});
