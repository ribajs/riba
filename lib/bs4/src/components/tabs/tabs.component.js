"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable:max-classes-per-file */
const core_1 = require("@ribajs/core");
class TabsComponent extends core_1.Component {
    constructor(element) {
        super(element);
        this.debug = core_1.Debug('component:bs4-tabs');
        this.scope = {};
        this.tabsSameHeight = true;
        const self = this;
        this.$el = core_1.JQuery(this.el);
        this.$tabs = this.$el.find('.nav-link');
        this.$tabPanes = this.$el.find('.tab-pane');
        this.$scrollable = this.$el.find('[scrollable]');
        this.debug('constructor', this.$el, this.$tabs, this.$tabPanes);
        this.$tabs.on('click', function (event) {
            event.preventDefault();
            const $tab = core_1.JQuery(this);
            self.activate($tab);
        });
        this.$tabs.off('shown.bs.tab').on('shown.bs.tab', (event) => {
            const $tab = core_1.JQuery(event.target);
            if (this.$scrollable.length) {
                const tabScrollPosition = $tab[0].getBoundingClientRect();
                const scrollLeftTo = this.$scrollable.scrollLeft() || 0 + tabScrollPosition.left;
                this.$scrollable.animate({ scrollLeft: scrollLeftTo }, 'slow');
            }
        });
        this.activate(this.$tabs.first());
        if (this.tabsSameHeight) {
            core_1.JQuery(window).on('resize', () => {
                this.setHeight();
            });
        }
        this.init(TabsComponent.observedAttributes);
    }
    static get observedAttributes() {
        return [];
    }
    /**
     * Make all tabs panes as height as the heighest tab pane
     */
    setHeight() {
        let heigest = 0;
        this.$tabPanes.each(function () {
            const $tabPane = core_1.JQuery(this);
            $tabPane.css('height', 'auto');
            const height = $tabPane.height() || 0;
            if (height > heigest) {
                heigest = height;
            }
        });
        this.$tabPanes.each(function () {
            const $tabPane = core_1.JQuery(this);
            $tabPane.css('height', heigest + 'px');
        });
    }
    deactivateAll() {
        this.$tabs.each(function () {
            const $tab = core_1.JQuery(this);
            $tab.removeClass('active');
        });
        this.$tabPanes.each(function () {
            const $tabPane = core_1.JQuery(this);
            $tabPane.removeClass('active show');
        });
    }
    activate($tab) {
        const target = $tab.attr('href');
        this.debug('activate', target, this.$el.find(target || ''));
        if (target) {
            const $target = this.$el.find(target);
            this.deactivateAll();
            $target.addClass('active');
            setTimeout(() => {
                $target.addClass('show');
                $tab.addClass('active');
                $target.trigger('shown.bs.tab');
                $tab.trigger('shown.bs.tab');
            }, 0);
        }
    }
    async afterBind() {
        this.setHeight();
    }
    template() {
        return null;
    }
}
exports.TabsComponent = TabsComponent;
TabsComponent.tagName = 'bs4-tabs';
