import type { ComponentLifecycleEventData } from '@ribajs/ssr';

export interface RenderResult extends ComponentLifecycleEventData {
  html: string;
  css?: string[];
}
