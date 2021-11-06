import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import configuration from './config/configuration';
import { MainModule } from './modules/api/main/main.module';
import { LegacyModule } from './modules/legacy/legacy.module';
import { ViewModule } from './modules/view/view.module';
import { WinstonModule } from 'nest-winston';
import winston from 'winston';
import { AuthenticationModule } from './modules/security/security.module';
import { FilesModule } from './modules/files/files.module';
import { AccountsModule } from './modules/accounts/accounts.module';
import { NodeModule } from './modules/node/node.module';

export type ContextType = {
  req: any;
  res: any;
  authToken?: JwtObjectType;
};

export type JwtObjectType = {
  iat: number;
  exp: number;
  iss: string;
  sub: string;
};

@Module({
  imports: [
    LegacyModule,
    MainModule,
    ViewModule,
    NodeModule,
    AuthenticationModule,
    FilesModule,
    AccountsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    GraphQLModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        autoSchemaFile: 'schema.gql',
        sortSchema: true,
        playground: config.get('playground'),
        introspection: config.get('playground'),
        cors: {
          origin: true,
          credentials: true,
        },
        context: ({ req, res }): ContextType => ({ req, res }),
      }),
    }),
    WinstonModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        level: config.get('logLevel'),
        transports: [new winston.transports.Console()],
      }),
    }),
  ],
})
export class AppModule {}
