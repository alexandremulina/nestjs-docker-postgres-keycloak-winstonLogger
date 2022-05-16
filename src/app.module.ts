import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
// import { TypeOrmModule } from '@nestjs/typeorm';
import {
  AuthGuard,
  KeycloakConnectModule,
  RoleGuard,
} from 'nest-keycloak-connect';
import { WinstonModule } from 'nest-winston';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
// import dbOptions, * as dpOptions from './ormconfig';

import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dbOptions from './ormconfig';
import { winstonConfig } from './utils/winston-config';
import { LoggerInterceptor } from './utils/logger-interceptor';

const keyCloakOptionsProvider = {
  provice: 'keyCloakDataProvider',
  useFactory: (config: ConfigService) => {
    return {
      authServerUrl: config.get('KEYCLOAK_AUTH_URI'),
      realm: config.get('KEYCLOAK_REALM'),
      clientId: config.get('KEYCLOAK_CLIENT_ID'),
      secret: config.get('KEYCLOAK_CLIENT_SECRET'),
    };
  },
  inject: [ConfigService],
};

@Module({
  imports: [
    TypeOrmModule.forRoot(dbOptions),
    ConfigModule.forRoot(),
    WinstonModule.forRoot(winstonConfig),
    AuthModule,
    KeycloakConnectModule.registerAsync(keyCloakOptionsProvider),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,

    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggerInterceptor,
    },
  ],
})
export class AppModule {}
