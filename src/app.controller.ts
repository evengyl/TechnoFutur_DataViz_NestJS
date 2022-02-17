import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller("api")
export class AppController 
{
  constructor(private appService: AppService) {}

  @Get("methode1")
  getHello() : string
  {
    return this.appService.tutupompidou();
  }

  @Get("methode2")
  getTutu() : any
  {
    return {"message" : "j'en ai marre de chercher après des idées de variables"}
  }
}
