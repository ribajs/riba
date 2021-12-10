// Import ESM Module into CommonJS
// See https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c
export const getPort = async (options) => {
    const { default: _getPort } = await import("get-port");
    return _getPort(options);
};
export default getPort;
