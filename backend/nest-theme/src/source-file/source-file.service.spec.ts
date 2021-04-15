import { Test, TestingModule } from '@nestjs/testing';
import { SourceFileService } from './source-file.service';

describe('SourceFileService', () => {
  let service: SourceFileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SourceFileService],
    }).compile();

    service = module.get<SourceFileService>(SourceFileService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
