import { Resolver, Query } from '@nestjs/graphql';
import { BadRequestException } from '@nestjs/common';

@Resolver()
export class AppResolver {
  @Query(() => String)
  check() {
    throw new BadRequestException(
      {
        msg: 'not gud',
        test: 'ok',
      },
      'testing',
    );
  }
}
