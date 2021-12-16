import { DynamicModule } from '@nestjs/common';
import { ExpressAdapter } from '@nestjs/platform-express';
export declare class AppModule {
    static register(expressAdapter: ExpressAdapter): DynamicModule;
}
