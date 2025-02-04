import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { LocalStrategy } from './strategies/local.strategy';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [UsersModule, PassportModule],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy],
})
export class AuthModule {}
