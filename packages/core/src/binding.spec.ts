import {
    Riba,
    View,
    Binding,
    Adapter,
} from './index';

import {
    textBinder,
} from '../src/binders/text.binder';
import { ITwoWayFormatter } from './interfaces';

const riba = new Riba();
riba.module.binderService.regist(textBinder);

describe('riba.Binding', () => {
    let model: object;
    let el: HTMLElement;
    let view: View;
    let binding: Binding;
    let originalPrefix: string;
    let adapter: Adapter;
    let routineFn;

    beforeEach(() => {
        originalPrefix = riba.prefix;
        riba.prefix = 'data';
        adapter = riba.adapters['.'];

        el = document.createElement('div');
        el.setAttribute('data-text', 'obj.name');

        view = riba.bind(el, { obj: { name: 'test' } });
        binding = view.bindings[0] as Binding;
        model = binding.model;
    });

    afterEach(() => {
        riba.prefix = originalPrefix;
    });

    it('gets assigned the proper binder routine matching the identifier', () => {
        routineFn = binding.binder.routine;
        expect(routineFn).toEqual(riba.binders.text.routine);
    });

    describe('when bind to non configurable properties', () => {
        let data: any;
        beforeEach(() => {
            data = {
                name: 'x',
                items: [],
            };
            Object.defineProperty(data, 'name', {
                enumerable: true,
                configurable: false,
                writable: true,
                value: 'y',
            });
            el.setAttribute('data-show', 'obj.items.length');
        });

        it('does not throw', () => {
            expect(() => {
                riba.bind(el, { obj: data });
            }).not.toThrow();
        });

    });

    describe('with formatters', () => {
        let valueInput: HTMLInputElement;
        it('register all formatters', () => {

            valueInput = document.createElement('input');
            valueInput.setAttribute('type', 'text');
            valueInput.setAttribute('data-value', 'obj.name | awesome | radical | totally');

            view = riba.bind(valueInput, { obj: { name: 'nothing' } });
            binding = view.bindings[0] as Binding;
            expect(binding.formatters).toEqual(['awesome', 'radical', 'totally']);
        });

        it('allows arguments with pipes', () => {

            valueInput = document.createElement('input');
            valueInput.setAttribute('type', 'text');
            valueInput.setAttribute('data-value', `obj.name | awesome | totally 'arg | with || pipes' 'and more args' | and 'others formatters' with 'pi||pes'`);

            view = riba.bind(valueInput, { obj: { name: 'nothing' } });
            binding = view.bindings[0] as Binding;

            expect(binding.formatters).toEqual(['awesome', `totally 'arg | with || pipes' 'and more args'`, `and 'others formatters' with 'pi||pes'`]);
        });
    });

    describe('bind()', () => {
        it('subscribes to the model for changes via the adapter', () => {
            jest.spyOn(adapter, 'observe');
            binding.bind();
            expect(adapter.observe).toHaveBeenCalledWith(model, 'name', binding);
        });

        it(`calls the binder's bind method if one exists`, () => {
            expect(() => {
                binding.bind();
            }).not.toThrow();

            binding.binder.bind = (_: HTMLElement) => { return; };
            jest.spyOn(binding.binder, 'bind');

            binding.bind();
            expect(binding.binder.bind).toHaveBeenCalled();
        });

        describe('with preloadData set to true', () => {
            beforeEach(() => {
                riba.preloadData = true;
            });

            it('sets the initial value', () => {
                jest.spyOn(binding, 'set');
                binding.bind();
                expect(binding.set).toHaveBeenCalledWith('test');
            });
        });

    });

    describe('unbind()', () => {
        describe('without a binder.unbind defined', () => {
            it('should not throw an error', () => {
                expect(() => {
                    binding.unbind();
                }).not.toThrow();
            });
        });

        describe('with a binder.unbind defined', () => {
            beforeEach(() => {
                binding.binder.unbind = () => { /**/ };
            });

            it('should not throw an error', () => {
                expect(() => {
                    binding.unbind();
                }).not.toThrow();
            });

            it(`calls the binder's unbind method`, () => {
                jest.spyOn(binding.binder, 'unbind');
                binding.unbind();
                expect(binding.binder.unbind).toHaveBeenCalled();
            });
        });
    });

    describe('set()', () => {
        it('performs the binding routine with the supplied value', () => {
            routineFn = jest.spyOn(binding.binder, 'routine');

            binding.set('sweater');
            expect(routineFn).toHaveBeenCalledWith(el, 'sweater');
        });

        it('applies any formatters to the value before performing the routine', () => {

            view.options.formatters.awesome = (value) => 'awesome ' + value;

            if (binding.formatters) {
                binding.formatters.push('awesome');
            }
            binding.set('sweater');

            expect(binding.binder.routine).toHaveBeenCalledWith(el, 'awesome sweater');
        });
    });

    describe('publish()', () => {
        let numberInput: HTMLInputElement;
        it(`should publish the value of a number input`, () => {
            numberInput = document.createElement('input');
            numberInput.setAttribute('type', 'number');
            numberInput.setAttribute('data-value', 'obj.num');

            view = riba.bind(numberInput, { obj: { num: 42 } });
            binding = view.bindings[0];
            model = binding.model;

            numberInput.value = '42';

            jest.spyOn(adapter, 'set');
            binding.publish();
            expect(adapter.set).toHaveBeenCalledWith(model, 'num', '42');
        });
    });

    describe('publishTwoWay()', () => {
        let numberInput;
        let valueInput;
        it('applies a two-way read formatter to function same as a single-way', () => {
            (view.options.formatters.awesome as ITwoWayFormatter) = {
                read: (value) => 'awesome ' + value,
            };

            routineFn = jest.spyOn(binding.binder, 'routine');

            if (!binding.formatters) {
                throw new Error('Formatters not set!');
            }

            binding.formatters.push('awesome');

            binding.set('sweater');
            expect(routineFn).toHaveBeenCalledWith(el, 'awesome sweater');
        });

        it(`should publish the value of a number input`, () => {
            // TODO remove any
            (riba.formatters.awesome as any) = {
                publish: (value: string) => 'awesome ' + value,
            };

            numberInput = document.createElement('input');
            numberInput.setAttribute('type', 'number');
            numberInput.setAttribute('data-value', 'obj.num | awesome');

            view = riba.bind(numberInput, { obj: { num: 42 } });
            binding = view.bindings[0] as Binding;
            model = binding.model;

            numberInput.value = '42';

            binding.publish();
            expect(adapter.set).toHaveBeenCalledWith(model, 'num', 'awesome 42');
        });

        it(`should format a value in both directions`, () => {
            // TODO remove any
            (riba.formatters.awesome as any) = {
                publish: (value: string) => 'awesome ' + value,
                read: (value: string) => value + ' is awesome',
            };

            jest.spyOn(binding.binder, 'routine');

            valueInput = document.createElement('input');
            valueInput.setAttribute('type', 'text');
            valueInput.setAttribute('data-value', 'obj.name | awesome');

            view = riba.bind(valueInput, { obj: { name: 'nothing' } });
            binding = view.bindings[0];
            model = binding.model;

            jest.spyOn(binding.binder, 'routine');

            valueInput.value = 'charles';
            binding.publish();
            expect(adapter.set).toHaveBeenCalledWith(model, 'name', 'awesome charles');

            binding.set('fred');
            expect(binding.binder.routine).toHaveBeenCalledWith(valueInput, 'fred is awesome');
        });

        it(`should resolve formatter arguments to their values`, () => {
            (riba.formatters.withArguments as ITwoWayFormatter) = {
                publish: (value, arg1, arg2) => {
                    return value + ':' + arg1 + ':' + arg2;
                },
                read: (value, arg1, arg2) => {
                    return value.replace(':' + arg1 + ':' + arg2, '');
                },
            };

            valueInput = document.createElement('input');
            valueInput.setAttribute('type', 'text');
            valueInput.setAttribute('data-value', `obj.name | withArguments config.age 'male'`);

            view = riba.bind(valueInput, {
                obj: {
                    name: 'nothing',
                },
                config: {
                    age: 50,
                },
            });

            binding = view.bindings[0] as Binding;
            model = binding.model;

            valueInput.value = 'bobby';
            binding.publish();
            expect(adapter.set).toBeCalledWith(model, 'name', 'bobby:50:male');

            expect(valueInput.value).toEqual('bobby');

            binding.set('andy:50:male');
            expect(binding.binder.routine).toBeCalledWith(valueInput, 'andy');
        });

        it(`should resolve formatter arguments correctly with multiple formatters`, () => {
            (riba.formatters.wrap as ITwoWayFormatter ) = {
                publish: (value: string, arg1: string, arg2: string) => {
                    return arg1 + value + arg2;
                },
                read: (value: string, arg1: string, arg2: string) => {
                    return value.replace(arg1, '').replace(arg2, '');
                },
            };

            (riba.formatters.saveAsCase as ITwoWayFormatter) = {
                publish: (value, typeCase) => {
                    return value['to' + typeCase + 'Case']();
                },
                read: (value, typeCase) => {
                    return value[typeCase === 'Upper' ? 'toLowerCase' : 'toUpperCase']();
                },
            };

            valueInput = document.createElement('input');
            valueInput.setAttribute('type', 'text');
            valueInput.setAttribute(
                'data-value',
                `obj.name | saveAsCase config.typeCase | wrap config.curly '}' | wrap config.square ']' | wrap config.paren ')'`,
            );

            view = riba.bind(valueInput, {
                obj: {
                    name: 'nothing',
                },
                config: {
                    paren: '(',
                    square: '[',
                    curly: '{',
                    typeCase: 'Upper',
                },
            });

            binding = view.bindings[0] as Binding;
            model = binding.model;

            jest.spyOn(binding.binder, 'routine');

            valueInput.value = 'bobby';
            binding.publish();
            expect(adapter.set).toBeCalledWith(model, 'name', '{[(BOBBY)]}');

            expect(valueInput.value).toEqual('bobby');

            binding.set('{[(ANDY)]}');
            expect(binding.binder.routine).toBeCalledWith(valueInput, 'andy');
        });

        it(`should not fail or format if the specified binding function doesn't exist`, () => {
            (riba.formatters.awesome as any) = {};
            valueInput = document.createElement('input');
            valueInput.setAttribute('type', 'text');
            valueInput.setAttribute('data-value', 'obj.name | awesome');

            view = riba.bind(valueInput, { obj: { name: 'nothing' } });
            binding = view.bindings[0] as Binding;
            model = binding.model;

            jest.spyOn(binding.binder, 'routine');

            valueInput.value = 'charles';
            binding.publish();
            expect(adapter.set).toBeCalledWith(model, 'name', 'charles');

            binding.set('fred');
            expect(binding.binder.routine).toBeCalledWith(valueInput, 'fred');
        });

        it(`should apply read binders left to right, and write binders right to left`, () => {
            (riba.formatters.totally as ITwoWayFormatter) = {
                publish: (value) => value + ' totally',
                read: (value) => value + ' totally',
            };

            (riba.formatters.awesome as ITwoWayFormatter) = {
                publish: (value) => value + ' is awesome',
                read: (value) => value + ' is awesome',
            };

            valueInput = document.createElement('input');
            valueInput.setAttribute('type', 'text');
            valueInput.setAttribute('data-value', 'obj.name | awesome | totally');

            view = riba.bind(valueInput, { obj: { name: 'nothing' } });
            binding = view.bindings[0] as Binding;
            model = binding.model;

            jest.spyOn(binding.binder, 'routine');

            binding.set('fred');
            expect(binding.binder.routine).toBeCalledWith(valueInput, 'fred is awesome totally');

            valueInput.value = 'fred';
            binding.publish();
            expect(adapter.set).toBeCalledWith(model, 'name', 'fred totally is awesome');
        });

        it(`binders in a chain should be skipped if they're not there`, () => {
            (riba.formatters.totally as ITwoWayFormatter) = {
                publish: (value) => value + ' totally',
                read: (value) => value + ' totally',
            };

            (riba.formatters.radical as ITwoWayFormatter) = {
                publish: (value) => value + ' is radical',
            };

            (riba.formatters.awesome as ITwoWayFormatter) = {
                read: (value) => value + ' is awesome',
            };

            valueInput = document.createElement('input');
            valueInput.setAttribute('type', 'text');
            valueInput.setAttribute('data-value', 'obj.name | awesome | radical | totally');

            view = riba.bind(valueInput, { obj: { name: 'nothing' } });
            binding = view.bindings[0] as Binding;
            model = binding.model;

            jest.spyOn(binding.binder, 'routine');

            expect(binding.binder.routine).toHaveBeenCalledWith(valueInput, 'nothing is awesome totally');

            binding.set('fred');
            expect(binding.binder.routine).toHaveBeenCalledWith(valueInput, 'fred is awesome totally');

            valueInput.value = 'fred';
            binding.publish();
            expect(adapter.set).toHaveBeenCalledWith(model, 'name', 'fred totally is radical');
        });
    });

    describe('formattedValue()', () => {
        it('applies the current formatters on the supplied value', () => {
            view.options.formatters.awesome = (value) => 'awesome ' + value;
            if (!binding.formatters) {
                throw new Error('Formatters not set!');
            }
            binding.formatters.push('awesome');
            expect(binding.formattedValue('hat')).toEqual('awesome hat');
        });

        describe('with a multi-argument formatter string', () => {
            beforeEach(() => {
                view.options.formatters.awesome = (value, prefix) => {
                    return prefix + ' awesome ' + value;
                };

                if (!binding.formatters) {
                    throw new Error('Formatters not set!');
                }
                binding.formatters.push(`awesome 'super'`);
            });

            it('applies the formatter with arguments', () => {
                expect(binding.formattedValue('jacket')).toEqual('super awesome jacket');
            });
        });

        describe('with a formatter string with pipes in argument', () => {
            beforeEach(() => {

                view.options.formatters.totally = (value, prefix) => {
                    return prefix + ' totally ' + value;
                };

                if (!binding.formatters) {
                    throw new Error('Formatters not set!');
                }
                binding.formatters.push(`totally 'arg | with || pipes'`);
            });

            it('applies the formatter with arguments with pipes', () => {
                expect(binding.formattedValue('jacket')).toEqual('arg | with || pipes totally jacket');
            });
        });
    });

    describe('getValue()', () => {
        it('should use binder.getValue() if present', () => {
            binding.binder.getValue = () => {
                return 'foo';
            };

            expect(binding.getValue(el)).toEqual('foo');
        });

        it('binder.getValue() should have access to passed element', () => {
            binding.binder.getValue = (_el) => {
                return _el.dataset.foo;
            };

            el.dataset.foo = 'bar';
            expect(binding.getValue(el)).toEqual('bar');
        });

        it('binder.getValue() should have access to binding', () => {
            binding.binder.getValue = function() {
                return (this as any).foo;
            };

            (binding as any).foo = 'bar';
            expect(binding.getValue(el)).toEqual('bar');
        });
    });
});
