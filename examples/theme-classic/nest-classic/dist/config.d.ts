import { ThemeConfig } from './types';
export declare const app: {
    root: string;
    port: number;
    environment: string;
};
export declare const theme: ThemeConfig;
export declare const session: {
    secret: string;
    resave: boolean;
    saveUninitialized: boolean;
    proxy: boolean;
    cookie: {
        maxAge: number;
        secure: boolean;
        sameSite: boolean | "none" | "lax" | "strict";
    };
};
export declare const moduleConfig: () => {
    app: {
        root: string;
        port: number;
        environment: string;
    };
    theme: ThemeConfig;
    session: {
        secret: string;
        resave: boolean;
        saveUninitialized: boolean;
        proxy: boolean;
        cookie: {
            maxAge: number;
            secure: boolean;
            sameSite: boolean | "none" | "lax" | "strict";
        };
    };
};
