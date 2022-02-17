import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService
{
  tutupompidou() : string
  {
    return 'Hello World!';
  }
}
