export const fetch = async (url, init) => {
    const { default: _fetch } = await import('node-fetch');
    return _fetch(url, init);
};
export default fetch;
//# sourceMappingURL=fetch.js.map