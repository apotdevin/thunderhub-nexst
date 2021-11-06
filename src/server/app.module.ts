import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import configuration from './config/configuration';
import { ViewModule } from './modules/view/view.module';
import { WinstonModule } from 'nest-winston';
import winston from 'winston';
import { AuthenticationModule } from './modules/security/security.module';
import { FilesModule } from './modules/files/files.module';
import { AccountsModule } from './modules/accounts/accounts.module';
import { NodeModule } from './modules/node/node.module';
import { ApiModule } from './modules/api/api.module';
import { getAuthToken } from './utils/request';
import jwt from 'jsonwebtoken';

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
    ApiModule,
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
        context: ({ req, res }): ContextType => {
          const token = getAuthToken(req);

          if (!token) return { req, res };

          const secret = config.get('jwtSecret');
          try {
            const authToken = jwt.verify(token, secret) as JwtObjectType;
            return { req, res, authToken };
          } catch (error) {
            return { req, res };
          }
        },
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
