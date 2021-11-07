import { Module } from '@nestjs/common';
import { AccountModule } from './account/account.module';
import { AmbossModule } from './amboss/amboss.module';
import { AuthModule } from './auth/auth.module';
import { BaseModule } from './base/base.module';
import { BitcoinModule } from './bitcoin/bitcoin.module';
import { MainModule } from './main/main.module';

@Module({
  imports: [
    MainModule,
    BaseModule,
    AuthModule,
    AccountModule,
    AmbossModule,
    BitcoinModule,
  ],
})
export class ApiModule {}
