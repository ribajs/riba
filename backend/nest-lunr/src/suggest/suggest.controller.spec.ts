import { Test, TestingModule } from '@nestjs/testing';
import { SuggestController } from './suggest.controller';
import { SuggestService } from './suggest.service';

describe('SuggestController', () => {
  let controller: SuggestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SuggestService],
      controllers: [SuggestController],
    }).compile();

    controller = module.get<SuggestController>(SuggestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
