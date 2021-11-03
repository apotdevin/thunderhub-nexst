import { Module } from '@nestjs/common';
import { BaseResolver } from './base.resolver';

@Module({ providers: [BaseResolver] })
export class BaseModule {}
