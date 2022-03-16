import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import {
  MercuriusFederationDriverConfig,
  MercuriusFederationDriver,
} from '@nestjs/mercurius';
import { AppController } from './app.controller';
import { GlobalExceptionsFilter } from './global-exception.handler';
import { AppResolver } from './app.resolver';

@Module({
  imports: [
    GraphQLModule.forRoot<MercuriusFederationDriverConfig>({
      driver: MercuriusFederationDriver,
      autoSchemaFile: '../schema.gql',
      graphiql: true,
      context: (req) => {
        return { req };
      },
      buildSchemaOptions: {
        numberScalarMode: 'integer',
      },
    }),
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionsFilter,
    },
    AppResolver,
  ],
})
export class AppModule {}
