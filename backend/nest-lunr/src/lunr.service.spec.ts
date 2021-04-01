import { Test, TestingModule } from '@nestjs/testing';
import { LunrService } from './lunr.service';

describe('LunrService', () => {
  let service: LunrService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LunrService],
    }).compile();

    service = module.get<LunrService>(LunrService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
