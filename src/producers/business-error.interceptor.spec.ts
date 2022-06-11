import { BusinessErrorInterceptor } from './business-error.interceptor';

describe('BusinessErrorInterceptor', () => {
  it('should be defined', () => {
    expect(new BusinessErrorInterceptor()).toBeDefined();
  });
});
