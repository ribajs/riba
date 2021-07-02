export interface PodloveWebPlayerTheme {
    tokens: {
        brand: string;
        brandDark: string;
        brandDarkest: string;
        brandLightest: string;
        shadeDark: string;
        shadeBase: string;
        contrast: string;
        alt: string;
    };
    fonts: {
        [key: string]: {
            name: string;
            family: string[];
            weight: number;
            src: string[];
        };
    };
}
