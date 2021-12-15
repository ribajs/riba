import { ConfigService } from '@nestjs/config';
import { SsrService as Ssr } from '@ribajs/node-ssr';
export declare class SsrService {
    private theme;
    private ssr;
    getSharedContext: Ssr['getSharedContext'];
    render: Ssr['render'];
    renderComponent: Ssr['renderComponent'];
    constructor(config: ConfigService);
}
