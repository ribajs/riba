import { Test, TestingModule } from '@nestjs/testing';
import { LinkListService } from './link-list.service';

describe('NavigationService', () => {
  let service: LinkListService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LinkListService],
    }).compile();

    service = module.get<LinkListService>(LinkListService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
