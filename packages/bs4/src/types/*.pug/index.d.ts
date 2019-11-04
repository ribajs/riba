/** Type definition for pug-loader: https://github.com/pugjs/pug-loader */
declare module '*.pug' {
  const pug: (locals?: any) => string;
  export default pug;
}
