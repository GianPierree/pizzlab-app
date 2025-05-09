import { Test, TestingModule } from '@nestjs/testing';
import { TestService } from '../../../src/test/test.service';

describe('TestService', () => {
  let service: TestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TestService],
    }).compile();

    service = module.get<TestService>(TestService);
  });

  it('Se debe validar el servcio', () => {
    expect(service).toBeDefined(); // TODO: El servicio ha sido inicializado
  });

  it('Se debe validar la creación del test', async () => {
    const result = await service.create();

    expect(result).toEqual(result);
    expect(result).toBeGreaterThan(0);
  });
});
