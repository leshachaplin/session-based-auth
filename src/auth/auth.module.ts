import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { UsersModule } from '../users/users.module';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local';
import { SessionSerializer } from './session.serializer';

@Module({
  controllers: [AuthController],
  imports: [
    PassportModule.register({
      defaultStrategy: 'local',
      session: true,
    }),
    UsersModule,
    SessionSerializer,
  ],
  providers: [AuthService, LocalStrategy],
  exports: [AuthService],
})
export class AuthModule {}
