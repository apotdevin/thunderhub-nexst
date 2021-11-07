import { Module } from '@nestjs/common';
import { NodeModule } from './node/node.module';
import { AccountModule } from './account/account.module';
import { AmbossModule } from './amboss/amboss.module';
import { AuthModule } from './auth/auth.module';
import { BaseModule } from './base/base.module';
import { BitcoinModule } from './bitcoin/bitcoin.module';
import { MainModule } from './main/main.module';
import { GithubModule } from './github/github.module';
import { WalletModule } from './wallet/wallet.module';
import { ToolsModule } from './tools/tools.module';
import { MacaroonModule } from './macaroon/macaroon.module';
import { NetworkModule } from './network/network.module';
import { PeerModule } from './peer/peer.module';

@Module({
  imports: [
    MainModule,
    BaseModule,
    AuthModule,
    AccountModule,
    AmbossModule,
    BitcoinModule,
    NodeModule,
    GithubModule,
    WalletModule,
    ToolsModule,
    MacaroonModule,
    NetworkModule,
    PeerModule,
  ],
})
export class ApiModule {}
