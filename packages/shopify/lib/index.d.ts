export * from './interfaces/interfaces';
import * as components from './components/shopify.components';
import * as formatters from './formatters/shopify.formatters';
import * as services from './services/shopify.services';
export declare const shopifyExtension: {
    formatters: typeof formatters;
    services: typeof services;
    components: typeof components;
};
/**
 * Formats the product variant's weight. The weight unit is set in General Settings.
 * @see https://help.shopify.com/themes/liquid/filters/additional-filters#weightWithUnit
 */
