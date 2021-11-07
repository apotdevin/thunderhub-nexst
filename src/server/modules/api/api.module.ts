import { Module } from '@nestjs/common';
import { NodeModule } from './node/node.module';
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
    NodeModule,
  ],
})
export class ApiModule {}
