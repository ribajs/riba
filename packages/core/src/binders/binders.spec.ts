import {
    Riba,
} from '../index';

import {
    textBinder,
} from './text.binder';

import {
    htmlBinder,
} from './html.binder';

import {
    valueBinder,
} from './value.binder';

import {
    showBinder,
} from './show.binder';

import {
    hideBinder,
} from './hide.binder';

import {
    enabledBinder,
} from './enabled.binder';

import {
    disabledBinder,
} from './disabled.binder';

import {
    checkedBinder,
} from './checked.binder';

const riba = new Riba();
riba.module.binderService.regist(textBinder);
riba.module.binderService.regist(htmlBinder);
riba.module.binderService.regist(valueBinder);
riba.module.binderService.regist(showBinder);
riba.module.binderService.regist(hideBinder);
riba.module.binderService.regist(enabledBinder);
riba.module.binderService.regist(disabledBinder);
riba.module.binderService.regist(checkedBinder);

describe('riba.binders', () => {
    let el: HTMLUnknownElement;
    let input: HTMLInputElement;
    let trueRadioInput: HTMLInputElement;
    let falseRadioInput: HTMLInputElement;
    let checkboxInput: HTMLInputElement;

    const createInputElement = (type: string, value?: string) => {
        const elem = document.createElement('input');
        elem.setAttribute('type', type);
        if (value !== undefined) {
            elem.setAttribute('value', value);
        }
        document.body.appendChild(elem);
        return elem;
    };

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

    beforeEach(() => {
        riba.configure({
            adapter: {
                subscribe: () => {/**/},
                unsubscribe: () => {/**/},
                read: () => {/**/},
                publish: () => {/**/},
            },
        });

        el = document.createElement('div');
        document.body.appendChild(el);
        input = createInputElement('text');

        // to test the radio input scenario when its value is 'true'
        trueRadioInput = createInputElement('radio', 'true');

        // to test the radio input scenario when its value is 'false'
        falseRadioInput = createInputElement('radio', 'false');

        // to test the checkbox input scenario
        checkboxInput = createInputElement('checkbox');
    });

    afterEach(() => {
        if (!el.parentNode) {
            throw new Error('el.parentNode is not defined!');
        }
        if (!input.parentNode) {
            throw new Error('input.parentNode is not defined!');
        }
        if (!trueRadioInput.parentNode) {
            throw new Error('trueRadioInput.parentNode is not defined!');
        }
        if (!falseRadioInput.parentNode) {
            throw new Error('falseRadioInput.parentNode is not defined!');
        }
        if (!checkboxInput.parentNode) {
            throw new Error('checkboxInput.parentNode is not defined!');
        }
        el.parentNode.removeChild(el);
        input.parentNode.removeChild(input);
        trueRadioInput.parentNode.removeChild(trueRadioInput);
        falseRadioInput.parentNode.removeChild(falseRadioInput);
        checkboxInput.parentNode.removeChild(checkboxInput);
    });

    describe('text', () => {
        it('sets the element\'s text content', () => {
            (riba.binders.text as any).routine(el, '<em>hello</em>');
            expect(el.textContent).toEqual('<em>hello</em>');
            expect(el.innerHTML).toEqual('&lt;em&gt;hello&lt;/em&gt;');
        });

        it('sets the element\'s text content to zero when a numeric zero is passed', () => {
            (riba.binders.text as any).routine(el, 0);
            expect(el.textContent).toEqual('0');
            expect(el.innerHTML).toEqual('0');
        });
    });

    describe('html', () => {
        it('sets the element\'s HTML content', () => {
            (riba.binders.html as any).routine(el, '<strong>hello</strong>');
            expect(el.textContent).toEqual('hello');
            expect(el.innerHTML).toEqual('<strong>hello</strong>');
        });

        it('sets the element\'s HTML content to zero when a zero value is passed', () => {
            (riba.binders.html as any).routine(el, 0);
            expect(el.textContent).toEqual('0');
            expect(el.innerHTML).toEqual('0');
        });
    });

    describe('value', () => {

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

    describe('show', () => {
        describe('with a truthy value', () => {
            it('shows the element', () => {
                (riba.binders.show as any).routine(el, true);
                expect(el.style.display).toEqual('');
            });
        });

        describe('with a falsey value', () => {
            it('hides the element', () => {
                (riba.binders.show as any).routine(el, false);
                expect(el.style.display).toEqual('none');
            });
        });
    });

    describe('hide', () => {
        describe('with a truthy value', () => {
            it('hides the element', () => {
                (riba.binders.hide as any).routine(el, true);
                expect(el.style.display).toEqual('none');
            });
        });

        describe('with a falsey value', () => {
            it('shows the element', () => {
                (riba.binders.hide as any).routine(el, false);
                expect(el.style.display).toEqual('');
            });
        });
    });

    describe('enabled', () => {
        describe('with a truthy value', () => {
            it('enables the element', () => {
                (riba.binders.enabled as any).routine(el, true);
                expect((el as HTMLButtonElement).disabled).toEqual(false);
            });
        });

        describe('with a falsey value', () => {
            it('disables the element', () => {
                (riba.binders.enabled as any).routine(el, false);
                expect((el as HTMLButtonElement).disabled).toEqual(true);
            });
        });
    });

    describe('disabled', () => {
        describe('with a truthy value', () => {
            it('disables the element', () => {
                (riba.binders.disabled as any).routine(el, true);
                expect((el as HTMLButtonElement).disabled).toEqual(true);
            });
        });

        describe('with a falsey value', () => {
            it('enables the element', () => {
                (riba.binders.disabled as any).routine(el, false);
                expect((el as HTMLButtonElement).disabled).toEqual(false);
            });
        });
    });

    describe('checked', () => {
        describe('with a checkbox input', () => {
            describe('and a truthy value', () => {
                it('checks the checkbox input', () => {
                    (riba.binders.checked as any).routine(checkboxInput, true);
                    expect(checkboxInput.checked).toEqual(true);
                });
            });

            describe('with a falsey value', () => {
                it('unchecks the checkbox input', () => {
                    (riba.binders.checked as any).routine(checkboxInput, false);
                    expect(checkboxInput.checked).toEqual(false);
                });
            });
        });

        describe('with a radio input with value="true"', () => {
            describe('and a truthy value', () => {
                it('checks the radio input', () => {
                    (riba.binders.checked as any).routine(trueRadioInput, true);
                    expect(trueRadioInput.checked).toEqual(true);
                });
            });

            describe('with a falsey value', () => {
                it('unchecks the radio input', () => {
                    (riba.binders.checked as any).routine(trueRadioInput, false);
                    expect(trueRadioInput.checked).toEqual(false);
                });
            });
        });

        describe('with a radio input with value="false"', () => {
            describe('and a truthy value', () => {
                it('checks the radio input', () => {
                    (riba.binders.checked as any).routine(falseRadioInput, true);
                    expect(falseRadioInput.checked).toEqual(false);
                });
            });

            describe('with a falsey value', () => {
                it('unchecks the radio input', () => {
                    (riba.binders.checked as any).routine(falseRadioInput, false);
                    expect(falseRadioInput.checked).toEqual(true);
                });
            });
        });
    });
});
