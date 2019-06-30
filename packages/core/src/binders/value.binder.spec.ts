import {
    Riba,
} from '../riba';

import {
    valueBinder,
} from './value.binder';

describe('riba.binders', () => {
    describe('value', () => {
        const riba = new Riba();
        riba.module.binderService.regist(valueBinder, 'value');

        let fragment: DocumentFragment;
        let el: HTMLInputElement;
        let model: any;

        beforeEach(() => {
            model = { value: 'foobar' };
            fragment = document.createDocumentFragment();
            el = document.createElement('input');
            el.setAttribute('rv-value', 'value');
            fragment.appendChild(el);
        });

        it('unbinds the same bound function', () => {
            let boundFn: EventListenerOrEventListenerObject;

            jest.spyOn(el, 'addEventListener').mockImplementation((event, fn) => {
                boundFn = fn;
            });

            const view = riba.bind(fragment, model);

            jest.spyOn(el, 'removeEventListener').mockImplementation((event, fn) => {
                expect(fn).toEqual(boundFn);
            });

            view.unbind();
        });

        it('binds to the model to input', () => {
            const view = riba.bind(fragment, model);
            expect(el.value).toBe(model.value);
        });

        it('reflects changes to the model into the DOM', () => {
            const view = riba.bind(fragment, model);

            expect(el.value).toBe('foobar');

            model.value = 'howdy';
            expect(el.value).toBe('howdy');
        });

        it('reflects changes to the model into the DOM after unbind/bind', () => {
            const view = riba.bind(fragment, model);
            expect(el.value).toBe('foobar');

            view.unbind();
            view.bind();

            model.value = 'howdy';
            expect(el.value).toBe('howdy');
        });

    });

    describe('value', () => {

        let input: HTMLInputElement;
        const riba = new Riba();
        riba.module.binderService.regist(valueBinder, 'value');

        const createOptionEls = (val: string) => {
            const option = document.createElement('option');
            option.value = val;
            option.textContent = val + ' text';
            return option;
        };

        const createSelectElement = (isMultiple: boolean, optionValues: Array<string> | {[group: string]: Array<string>}) => {
            const elem = document.createElement('select');
            let options = new Array<any>();
            if (Array.isArray(optionValues)) {
                options = optionValues.map(createOptionEls);
                options.forEach((option) => {
                    elem.appendChild(option);
                });
            } else {
                // grouped
                Object.keys(optionValues).forEach((group) => {
                    const optGroupEl = document.createElement('optgroup');
                    optGroupEl.label = group;
                    options = optionValues[group].map(createOptionEls);
                    options.forEach((option) => {
                        optGroupEl.appendChild(option);
                    });
                    elem.appendChild(optGroupEl);
                });
            }
            if (isMultiple) {
                elem.multiple = true;
            }
            document.body.appendChild(elem);
            return elem;
        };

        const createInputElement = (type: string, value?: string) => {
            const elem = document.createElement('input');
            elem.setAttribute('type', type);
            if (value !== undefined) {
                elem.setAttribute('value', value);
            }
            document.body.appendChild(elem);
            return elem;
        };

        beforeEach(() => {
            riba.configure({
                adapter: {
                    subscribe: () => {/**/},
                    unsubscribe: () => {/**/},
                    read: () => {/**/},
                    publish: () => {/**/},
                },
            });

            input = createInputElement('text');
        });

        afterEach(() => {
            if (!input.parentNode) {
                throw new Error('input.parentNode is not defined!');
            }
            input.parentNode.removeChild(input);
        });

        it('sets the element\'s value', () => {
            (riba.binders.value as any).routine(input, 'pitchfork');
            expect(input.value).toEqual('pitchfork');
        });

        it('applies a default value to the element when the model doesn\'t contain it', () => {
            (riba.binders.value as any).routine(input, undefined);
            expect(input.value).toEqual('');
        });

        it('sets the element\'s value to zero when a zero value is passed', () => {
            (riba.binders.value as any).routine(input, 0);
            expect(input.value).toEqual('0');
        });

        describe('in a select element', () => {

            let selectEl: HTMLSelectElement;
            let selectMultipleEl: HTMLSelectElement;
            let groupedSelectEl: HTMLSelectElement;
            let groupedMultipleSelectEl: HTMLSelectElement;

            beforeEach(() => {
                selectEl = createSelectElement(false, ['a', 'b', 'c']);
                selectMultipleEl = createSelectElement(true, ['d', 'e', 'f']);
                groupedSelectEl = createSelectElement(false, { group1: ['a'], group2: ['b', 'c'] });
                groupedMultipleSelectEl = createSelectElement(true, { group1: ['a'], group2: ['b', 'c'] });
            });

            it('sets the correct option on a select element', () => {
                (riba.binders.value as any).routine(selectEl, 'b');
                (riba.binders.value as any).routine(selectEl, 'c');
                expect(selectEl.value).toEqual('c');
            });

            it('sets the correct option on a select-multiple element', () => {
                (riba.binders.value as any).routine(selectMultipleEl, ['d', 'f']);
                const result = Array.prototype.slice.call(selectMultipleEl.children)
                    .filter((option) => {
                        return option.selected;
                    })
                    .map((option) => {
                        return option.value;
                    });

                expect(result).toEqual(['d', 'f']);
            });

            it('sets the correct option on a grouped select element', () => {
                (riba.binders.value as any).routine(groupedSelectEl, 'b');
                (riba.binders.value as any).routine(groupedSelectEl, 'c');
                expect(groupedSelectEl.value).toEqual('c');
            });

            it('sets the correct option on a select-multiple element', () => {
                (riba.binders.value as any).routine(groupedMultipleSelectEl, ['a', 'c']);
                const result = Array.prototype.slice.call(groupedMultipleSelectEl.options)
                    .filter((option) => {
                        return option.selected;
                    })
                    .map((option) => {
                        return option.value;
                    });

                expect(result).toEqual(['a', 'c']);
            });

            afterEach(() => {
                if (!selectEl.parentNode) {
                    throw new Error('selectEl.parentNode is not defined!');
                }
                if (!selectMultipleEl.parentNode) {
                    throw new Error('selectMultipleEl.parentNode is not defined!');
                }
                if (!groupedSelectEl.parentNode) {
                    throw new Error('groupedSelectEl.parentNode is not defined!');
                }
                if (!groupedMultipleSelectEl.parentNode) {
                    throw new Error('groupedMultipleSelectEl.parentNode is not defined!');
                }
                selectEl.parentNode.removeChild(selectEl);
                selectMultipleEl.parentNode.removeChild(selectMultipleEl);
                groupedSelectEl.parentNode.removeChild(groupedSelectEl);
                groupedMultipleSelectEl.parentNode.removeChild(groupedMultipleSelectEl);
            });
        });
    });

});
