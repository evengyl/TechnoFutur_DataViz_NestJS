import { Controller, Get } from '@nestjs/common';

@Controller('users')
export class UsersController {
    @Get()
    getAll() : any[]
    {
        return ["user1", "user2", "user3"]
    }

   
}
