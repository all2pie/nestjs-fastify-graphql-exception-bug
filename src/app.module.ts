import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import {
  MercuriusFederationDriverConfig,
  MercuriusFederationDriver,
} from '@nestjs/mercurius';
import { AppController } from './app.controller';
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
      errorFormatter: (execution, ctx) => {
        const error = execution.errors[0];

        // No details here as well
        console.log('Error: ', error);

        return {
          response: {
            data: execution.data,
            errors: execution.errors,
            extensions: execution.extensions,
          },
          statusCode: 404,
        };
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppResolver],
})
export class AppModule {}
