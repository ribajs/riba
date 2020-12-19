import { SsrMiddleware } from './ssr.middleware';

describe('SsrMiddleware', () => {
  it('should be defined', () => {
    expect(new SsrMiddleware()).toBeDefined();
  });
});
