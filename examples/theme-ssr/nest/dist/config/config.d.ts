import { NestThemeConfig } from '@ribajs/nest-theme';
export declare const app: {
    root: string;
    port: number;
    environment: string;
};
export declare const theme: NestThemeConfig;
export declare const session: {
    secret: string;
    resave: boolean;
    saveUninitialized: boolean;
    proxy: boolean;
    cookie: {
        maxAge: number;
        secure: boolean;
        sameSite: boolean | "strict" | "none" | "lax";
    };
};
export declare const appConfig: (() => {
    root: string;
    port: number;
    environment: string;
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    root: string;
    port: number;
    environment: string;
}>;
