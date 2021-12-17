export interface ThemeConfig {
  name: string;
  active?: string;
  viewEngine: "pug" | "twig" | "liquid";
  assetsDir: string;
  viewsDir: string;
}
