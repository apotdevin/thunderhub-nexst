import { Module } from '@nestjs/common';
import { NodeModule as NodeServiceModule } from '../../node/node.module';
import {
  BalancesResolver,
  LightningBalanceResolver,
  NodeResolver,
  OnChainBalanceResolver,
} from './node.resolver';

@Module({
  imports: [NodeServiceModule],
  providers: [
    NodeResolver,
    BalancesResolver,
    OnChainBalanceResolver,
    LightningBalanceResolver,
  ],
})
export class NodeModule {}
