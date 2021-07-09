import { Test, TestingModule } from '@nestjs/testing';
import { RefreshCacheService } from './refresh-cache.service';

describe('RefreshCacheService', () => {
  let service: RefreshCacheService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RefreshCacheService],
    }).compile();

    service = module.get<RefreshCacheService>(RefreshCacheService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
