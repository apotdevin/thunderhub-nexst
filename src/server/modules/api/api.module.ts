import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { BaseModule } from './base/base.module';
import { MainModule } from './main/main.module';

@Module({ imports: [MainModule, BaseModule, AuthModule] })
export class ApiModule {}
