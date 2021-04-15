import { Test, TestingModule } from '@nestjs/testing';
import { TemplateFileService } from './template-file.service';

describe('TemplateFileService', () => {
  let service: TemplateFileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TemplateFileService],
    }).compile();

    service = module.get<TemplateFileService>(TemplateFileService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
