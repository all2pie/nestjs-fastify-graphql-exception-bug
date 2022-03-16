import { Catch, ArgumentsHost } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Logger } from '@nestjs/common';

@Catch()
export class GlobalExceptionsFilter extends BaseExceptionFilter {
  async catch(exception, host: ArgumentsHost) {
    Logger.debug(exception, `Global Error Handler`);

    const type = host.getType() as string;

    if (type === 'http') {
      super.catch(exception, host);
    } else {
      throw exception;
    }
  }
}
