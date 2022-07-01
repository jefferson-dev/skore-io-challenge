import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Role } from '../../common/enums/role.enum';

export interface AuthUser {
  id: string;
  name: string;
  role: Role;
}

export const CurrentUser = createParamDecorator(
  (_: unknown, context: ExecutionContext): AuthUser => {
    const { req } = GqlExecutionContext.create(context).getContext();

    return req.user;
  },
);
