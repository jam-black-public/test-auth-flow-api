import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

export const AUTH_METADATA = {
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
};
@Module(AUTH_METADATA)
export class AuthModule {}
