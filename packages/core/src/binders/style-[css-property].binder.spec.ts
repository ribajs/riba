import {
    Riba,
} from '../index';

import {
    cssStarBinder,
} from './style-star.binder';

const riba = new Riba();
riba.module.binder.regist(cssStarBinder);

describe('riba.binders', () => {
    let element: HTMLDivElement;
    let fragment: DocumentFragment;
    let model: any = {};

    beforeEach(() => {
        fragment = document.createDocumentFragment();
        element = document.createElement('div');
        fragment.appendChild(element);

        model = {
            style: {
                paddingTop: '100px',
                backgroundColor: '',
            },
        };
    });

    describe('css-*', () => {
        it('Adds / removes a style property to the element', () => {
            element.className = 'foobar';

            expect(element.getAttribute('style')).toBeNull();

            element.setAttribute('rv-style-padding-top', 'style.paddingTop');
            element.setAttribute('rv-style-background-color', 'style.backgroundColor');
            riba.bind(fragment, model);

            expect(element.getAttribute('style')).toEqual('padding-top: 100px;');

            model.style.paddingTop = '0px';
            expect(element.getAttribute('style')).toEqual('padding-top: 0px;');

            model.style.backgroundColor = 'black';
            expect(element.getAttribute('style')).toEqual('padding-top: 0px; background-color: black;');

            model.style.paddingTop = undefined;
            expect(element.getAttribute('style')).toEqual('background-color: black;');

            model.style.backgroundColor = undefined;
            expect(element.getAttribute('style')).toEqual('');
        });
    });

});
