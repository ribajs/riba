import type { PageComponentAfterBindEventData } from '@ribajs/ssr';
export interface RenderResult extends PageComponentAfterBindEventData {
    html: string;
    css?: string[];
}
