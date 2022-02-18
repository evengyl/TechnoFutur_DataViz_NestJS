import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

@Controller()
export class AppController {
    
    @Get('testReqExpress')
    testExpress(@Req() request : Request, @Res() response : Response) : void
    {
        console.log(request)
        console.log(response)
    }

    @Post("testBody")
    testBody(@Body("name") name : string, @Body("dev") dev : boolean)
    {
        console.log(name)
        console.log(dev)
    }
}
