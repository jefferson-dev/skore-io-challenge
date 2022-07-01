import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../infra/database/prisma/prisma.service';
import { ContentService } from '../content.service';
import { createContent } from './mock/content.mock';
import {
  resultArray,
  resultObject,
  resultObjectUpdated,
} from './mock/results.mock';
import { ADMIN } from './mock/user.mock';

describe('ContentService', () => {
  let service: ContentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContentService, PrismaService],
    }).compile();

    service = module.get<ContentService>(ContentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an array of contents', async () => {
    jest.spyOn(service, 'findAll').mockResolvedValue(resultArray);

    expect(await service.findAll()).toBe(resultArray);
  });

  it('should return content by id', async () => {
    jest.spyOn(service, 'findOne').mockResolvedValue(resultObject);

    expect(await service.findOne('34273eef-b12e-4db9-9b90-11e6bdfb7268')).toBe(
      resultObject,
    );
  });

  it('must create a content and return id', async () => {
    jest.spyOn(service, 'create').mockResolvedValue(resultObject);

    const content = await service.create(ADMIN, createContent);

    expect(content).toBe(resultObject);
    expect(content).toHaveProperty('id');
  });

  it('must update a content through the id', async () => {
    jest.spyOn(service, 'update').mockResolvedValue(resultObjectUpdated);

    const content = await service.update(
      ADMIN,
      '34273eef-b12e-4db9-9b90-11e6bdfb7268',
      {
        id: '34273eef-b12e-4db9-9b90-11e6bdfb7268',
        name: 'Update',
      },
    );

    expect(content).toBe(resultObjectUpdated);
    expect(content).toHaveProperty('name', 'Update');
  });

  it('must delete a content through the id', async () => {
    jest.spyOn(service, 'remove').mockResolvedValue(null as any);

    const content = await service.remove(
      ADMIN,
      '34273eef-b12e-4db9-9b90-11e6bdfb7268',
    );

    expect(content).toBeNull();
  });
});
