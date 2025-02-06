import { Test, TestingModule } from '@nestjs/testing';
import { Crypto } from './crypto.service';

describe('Crypto', () => {
  let service: Crypto;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Crypto],
    }).compile();

    service = module.get<Crypto>(Crypto);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
