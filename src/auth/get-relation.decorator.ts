import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { SourceSystem } from 'src/source-systems/source-system.entity';
import { User } from 'src/users/user.entity';

export const GetUser = createParamDecorator(
  (_data, ctx: ExecutionContext): User => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);

export const GetSourceSystem = createParamDecorator(
  (_data, ctx: ExecutionContext): SourceSystem => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
