"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@ribajs/core");
 % ;
if (templateEngine === 'pug') {
     %  > ;
    import pugTemplate from './<%= name %>..component.pug';
     % ;
}
 %  >  % ;
if (templateEngine === 'html') {
     %  > ;
    import template from './<%= name %>.component.html';
     % ;
}
 %  >
    interface;
IScope;
{
    hello ?  : string;
}
class default_1 {
}
exports.default_1 = default_1;
(name) %  > core_1.Component;
core_1.Component;
{
    tagName: string = 'rv-<%= name %>';
    autobind = true;
    get;
    observedAttributes();
    {
        return ['hello'];
    }
    debug = core_1.Debug('component:' + , classify(name) %  > core_1.Component.tagName);
    scope: IScope = {
        hello: undefined,
    };
    constructor(element ?  : HTMLElement);
    {
        super(element);
        this.debug('constructor', this);
        this.init(, classify(name) %  > core_1.Component.observedAttributes);
    }
    async;
    init(observedAttributes, string[]);
    {
        return super.init(observedAttributes)
            .then((view) => {
            return view;
        });
    }
    async;
    beforeBind();
    {
        this.debug('beforeBind');
    }
    async;
    afterBind();
    {
        this.debug('afterBind', this.scope);
    }
    requiredAttributes();
    {
        return [];
    }
    attributeChangedCallback(attributeName, string, oldValue, any, newValue, any, namespace, string | null);
    {
        super.attributeChangedCallback(attributeName, oldValue, newValue, namespace);
    }
    disconnectedCallback();
    {
        super.disconnectedCallback();
    }
    ____name____component_html_1.default();
    {
        // Only set the component template if there no childs already
        if (this.el.hasChildNodes()) {
            this.debug('Do not use template, because element has child nodes');
            return null;
        }
        else {
             % ;
            if (templateEngine === 'pug') {
                 %  > ;
                const template = ____name_____component_pug_1.default(this.scope);
                 % ;
            }
             %  >
                this.debug('Use template', ____name____component_html_1.default);
            return ____name____component_html_1.default;
        }
    }
}
