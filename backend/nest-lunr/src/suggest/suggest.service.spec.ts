import { Test, TestingModule } from '@nestjs/testing';
import { SuggestService } from './suggest.service';

describe('SuggestService', () => {
  let service: SuggestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SuggestService],
    }).compile();

    service = module.get<SuggestService>(SuggestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
