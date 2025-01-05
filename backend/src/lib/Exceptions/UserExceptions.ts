import { NotFoundException } from '@nestjs/common';
import { ServerResponse } from 'src/lib/types';

export class UserNotFoundException extends NotFoundException {
  constructor(error?: string) {
    const response: ServerResponse<null> = {
      message: 'User Not Found',
      data: null,
      error: error || 'User Not Found',
    };
    super(response);
  }
}
