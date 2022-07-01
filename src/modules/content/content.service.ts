import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthUser } from 'src/infra/auth/current-user';
import { PrismaService } from '../../infra/database/prisma/prisma.service';
import { Role } from '../../common/enums/role.enum';
import { CreateContentInput } from './dto/create-content.input';
import { UpdateContentInput } from './dto/update-content.input';

@Injectable()
export class ContentService {
  constructor(private prisma: PrismaService) {}

  create(user: AuthUser, createContentInput: CreateContentInput) {
    if (user.role !== Role.ADMIN) {
      throw new UnauthorizedException('Unauthorized');
    }

    return this.prisma.contents.create({ data: createContentInput });
  }

  findAll() {
    return this.prisma.contents.findMany();
  }

  async findOne(id: string) {
    const content = await this.prisma.contents.findUnique({ where: { id } });

    if (!content) {
      return;
    }

    await this.prisma.contents.update({
      where: { id },
      data: { views: content.views++ },
    });

    return content;
  }

  update(user: AuthUser, id: string, updateContentInput: UpdateContentInput) {
    if (user.role !== Role.ADMIN) {
      throw new UnauthorizedException('Unauthorized');
    }

    return this.prisma.contents.update({
      where: { id },
      data: updateContentInput,
    });
  }

  remove(user: AuthUser, id: string) {
    if (user.role !== Role.ADMIN) {
      throw new UnauthorizedException('Unauthorized');
    }

    return this.prisma.contents.delete({ where: { id } });
  }
}
