import {
  Injectable,
  UnauthorizedException,
  ExecutionContext,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard<T = any> extends AuthGuard('local') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const result = (await super.canActivate(context)) as boolean;

    if (result) {
      const request = context.switchToHttp().getRequest();

      await super.logIn(request);
    }

    return true;
  }

  handleRequest<TUser = any>(err: T, user: TUser): TUser | never {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }

    return user;
  }
}
