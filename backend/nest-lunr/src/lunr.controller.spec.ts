import { Test, TestingModule } from '@nestjs/testing';
import { LunrController } from './lunr.controller';
import { LunrService } from './lunr.service';

describe('LunrController', () => {
  let controller: LunrController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LunrService],
      controllers: [LunrController],
    }).compile();

    controller = module.get<LunrController>(LunrController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
