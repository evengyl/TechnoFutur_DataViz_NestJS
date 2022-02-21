import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query } from '@nestjs/common';
import { UsersService } from 'src/shared/users.service';
import { UsersDTO } from './dto/users.dto';
import { Users } from './models/users.model';

@Controller('api/users')
export class UsersController {
    /*
        localhost:3000/api/users        -> GET getall
        localhost:3000/api/users/:id    -> GET getoneById
        localhost:3000/api/users        -> POST create
        localhost:3000/api/users/:id    -> PATCH updateById
        localhost:3000/api/users/:id    -> DELETE deleteById
    */

    constructor(private userService : UsersService){}

    @Get()
    getAll(@Query("max") max : number) : Users[]
    {
        if(max)
        {
            const listUserSorted = this.userService.getByMaxUsers(max)
            if(listUserSorted)
            {
                return listUserSorted
            }
            throw new BadRequestException("Le paramètre max n'est pas valable")
        }
        else
            return this.userService.getAll()
    }

    @Get(":id")
    getOneById(@Param("id") id : number) : Users
    {
        const userFinded = this.userService.getOneById(id)

        if(userFinded)
            return userFinded
        else
            throw new NotFoundException('User non trouvé dans la méthode GetOne')
    }

    @Post()
    create(@Body() user : UsersDTO) : Users
    {
        return this.userService.create(user)
    }

    @Patch(":id")
    updateByID(@Param("id") id : number, @Body() updateUser : UsersDTO) : Users
    {
        const oldUser = this.getOneById(id)
        return this.userService.updateByID(oldUser, updateUser)
    }

    @Delete(":id")
    deleteByID(@Param("id") id : number) : { [key : string] : string}
    {
        const user = this.getOneById(id)
        let deletedId = this.userService.deleteByID(user)

        return { message : `User ${deletedId} bien supprimé`}
    }
}
