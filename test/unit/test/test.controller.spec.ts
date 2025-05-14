import { Test, TestingModule } from '@nestjs/testing';
import { TestController } from '../../../src/test/test.controller';
import { TestService } from '../../../src/test/test.service';

describe('TestController', () => {
  let controller: TestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TestController],
      providers: [TestService],
    }).compile();

    controller = module.get<TestController>(TestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
