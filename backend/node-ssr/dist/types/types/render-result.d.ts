import type { ComponentLifecycleEventData } from "@ribajs/ssr";
import type { ConsoleMessage } from "./console-message";
export interface RenderResult extends ComponentLifecycleEventData {
    html: string;
    css?: string[];
    output?: ConsoleMessage[];
}
