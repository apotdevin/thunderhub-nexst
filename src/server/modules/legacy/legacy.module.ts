import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { BaseModule } from './base/base.module';

@Module({ imports: [BaseModule, AuthModule] })
export class LegacyModule {}
