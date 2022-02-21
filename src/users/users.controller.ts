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

        listUsers : Users[]

        constructor(private userService : UsersService){
            this.listUsers = []
    
            this.listUsers.push({ id : 1, firstName : "Loic", lastName : "Baudoux", age : 30})
            this.listUsers.push({ id : 2, firstName : "Angélique", lastName : "TUTU", age : 25})
            this.listUsers.push({ id : 3, firstName : "David", lastName : "TUTU", age : 177})
            this.listUsers.push({ id : 4, firstName : "Vincent", lastName : "TUTU", age : 999})
            this.listUsers.push({ id : 5, firstName : "Medes", lastName : "TUTU", age : 12})
        }
    
    
        @Get()
        getAll(@Query("max") max : number) : Users[]
        {
            if(max)
            {
                let sorted = this.listUsers.length - max
                if(sorted > 0)
                {
                    sorted = sorted * -1
                    let listUsersTemp = [...this.listUsers]
                    return listUsersTemp.slice(0, sorted)
                
                }
                throw new BadRequestException("Le paramètre max n'est pas valable")
            }
            else
                return this.listUsers
        }
    
        @Get(":id")
        getOneById(@Param("id") id : number) : Users
        {
            const userFinded = this.listUsers.find(user => user.id == id)
    
            if(userFinded)
                return userFinded
            else
                throw new NotFoundException('User non trouvé dans la méthode GetOne')
        }
    
        @Post()
        create(@Body() user : UsersDTO) : Users
        {
            const newUser = new Users()
            const { firstName, lastName, age } = user
            newUser.firstName = firstName
            newUser.lastName = lastName
            newUser.age = age
            newUser.assignId(this.listUsers.length)
      
            this.listUsers.push(newUser)
      
            return this.listUsers.find(user => user.id == newUser.id)
        }
    
        @Patch(":id")
        updateByID(@Param("id") id : number, @Body() updateUser : UsersDTO) : Users
        {
            const user = this.getOneById(id) //Travail par référence à l'objet !
            
            user.firstName = updateUser.firstName ? updateUser.firstName : user.firstName
            user.lastName = updateUser.lastName ? updateUser.lastName : user.lastName
            user.age = updateUser.age ? updateUser.age : user.age
    
            return user
        }
    
        @Delete(":id")
        deleteByID(@Param("id") id : number)
        {
            const user = this.getOneById(id)
    
            const indexUser = this.listUsers.findIndex(item => item.id == user.id)
      
            this.listUsers.splice(indexUser, 1)
      
            return { message : `User ${id} bien supprimé` }
        }
}
