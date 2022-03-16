import { BadRequestException, Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHello(): string {
    throw new BadRequestException(
      {
        msg: 'not gud',
        test: 'ok',
      },
      'testing',
    );
  }
}
