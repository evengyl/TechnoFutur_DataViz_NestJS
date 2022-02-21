import { Global, Injectable } from '@nestjs/common';
import { UsersDTO } from 'src/users/dto/users.dto';
import { Users } from 'src/users/models/users.model';

@Injectable()
export class UsersService {

    listUsers : Users[]


    constructor()
    {
        this.listUsers = []
    
            this.listUsers.push({ id : 1, firstName : "Loic", lastName : "Baudoux", age : 30})
            this.listUsers.push({ id : 2, firstName : "Angélique", lastName : "TUTU", age : 25})
            this.listUsers.push({ id : 3, firstName : "David", lastName : "TUTU", age : 177})
            this.listUsers.push({ id : 4, firstName : "Vincent", lastName : "TUTU", age : 999})
            this.listUsers.push({ id : 5, firstName : "Medes", lastName : "TUTU", age : 12})
    }

    getAll() : Users[]
    {
        return this.listUsers
    }

    getByMaxUsers(max : number) : Users[]
    {
        let sorted = this.listUsers.length - max
        if(sorted > 0)
        {
            sorted = sorted * -1
            let listUsersTemp = [...this.listUsers]
            return listUsersTemp.slice(0, sorted)
        }
    }

    getOneById(id : number) : Users
    {
        let userFinded = this.listUsers.find(user => user.id == id)

        return userFinded
    }

    create(user : UsersDTO) : Users
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


    updateByID(oldUser : Users, updateUser : UsersDTO) : Users
    {
        oldUser.firstName = updateUser.firstName ? updateUser.firstName : oldUser.firstName
        oldUser.lastName = updateUser.lastName ? updateUser.lastName : oldUser.lastName
        oldUser.age = updateUser.age ? updateUser.age : oldUser.age

        return oldUser
    }

    deleteByID(user : Users) : number
    {
        const indexUser = this.listUsers.findIndex(item => item.id == user.id)
  
        this.listUsers.splice(indexUser, 1)
        return user.id
    }
    
}
