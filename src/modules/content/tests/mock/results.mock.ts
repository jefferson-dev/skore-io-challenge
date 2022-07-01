import { Types } from '../../entities/content.entity';

export const resultObject = {
  id: '34273eef-b12e-4db9-9b90-11e6bdfb7268',
  name: 'Teste',
  description: 'Teste Descrição',
  views: 1,
  type: Types.image,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const resultObjectUpdated = {
  id: '34273eef-b12e-4db9-9b90-11e6bdfb7268',
  name: 'Update',
  description: 'Teste Descrição',
  views: 1,
  type: Types.image,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const resultArray = [
  {
    id: '34273eef-b12e-4db9-9b90-11e6bdfb7268',
    name: 'Teste',
    description: 'Teste Descrição',
    views: 1,
    type: Types.image,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
