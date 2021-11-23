import { Module } from '@nestjs/common';
import { NodeModule } from '../../node/node.module';
import { ChannelsResolver } from './channels.resolver';

@Module({
  imports: [NodeModule],
  providers: [ChannelsResolver],
})
export class ChannelsModule {}
