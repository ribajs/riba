import { ConfigService } from '@nestjs/config';
import { EventDispatcher } from './event-dispatcher.service';
interface RenderResult {
    html: string;
    css?: string[];
    component: {
        tagName: string;
    };
}
export declare class Ssr {
    protected config: ConfigService;
    constructor(config: ConfigService);
    getSharedContext(): {
        ssrEvents: EventDispatcher;
    };
    getTemplateEingine(templatePath: string): any;
    transformLayout(layout: string, placeholderPageTag: string, pageTag: string): Promise<string>;
    readSsrScripts(): Promise<{
        vendors: string;
        main: string;
    }>;
    renderTemplate(templatePath: string, variables: any): Promise<any>;
    renderWithJSDom(layout: string, componentTagName: string): Promise<RenderResult>;
    renderWithHappyDom(layout: string, componentTagName: string): Promise<RenderResult>;
    renderComponent(opt: {
        templatePath: string;
        placeholderPageTag: string;
        pageComponentPath: string;
        componentTagName: string;
        engine: 'jsdom' | 'happy-dom';
        variables: any;
    }): Promise<RenderResult>;
}
export {};
