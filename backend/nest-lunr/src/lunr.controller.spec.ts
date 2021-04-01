import { Test, TestingModule } from '@nestjs/testing';
import { LunrController } from './lunr.controller';

describe('LunrController', () => {
  let controller: LunrController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LunrController],
    }).compile();

    controller = module.get<LunrController>(LunrController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
