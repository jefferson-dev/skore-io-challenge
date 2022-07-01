import { Test, TestingModule } from '@nestjs/testing';
import { ContentResolver } from '../content.resolver';
import { ContentService } from '../content.service';
import { PrismaService } from '../../../infra/database/prisma/prisma.service';

describe('ContentResolver', () => {
  let resolver: ContentResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContentResolver, ContentService, PrismaService],
    }).compile();

    resolver = module.get<ContentResolver>(ContentResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
