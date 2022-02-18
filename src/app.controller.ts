import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller("api/todos")
export class AppController 
{
  constructor() {}
  /*
    GET:localhost:3000/api/todos/         ->get all todos GET
    GET:localhost:3000/api/todos/42       ->get one todo GET
    POST:localhost:3000/api/todos/        ->post un nouveau todo POST
    PUT/PATCH:localhost:3000/api/todos/42 -> put/patch permet la modification d'un todo PUT/PATCH
    DELETE:localhost:3000/api/todos/42    -> delete un todo DELETE
  */

    @Get()
    getAll() : any[]
    {
      return ["todo 1", "todo 2", "todo 3"]
    }

    @Get(":id")
    getOneById(@Param('id') id) : any
    {
      return `todo ${id}`
    }

    @Post()
    postTodo(@Body() newTodo) : any
    {
      console.log(newTodo)
      return "Nouveau todo créé"
    }

    @Patch(':id')
    updateTodo(@Param('id') id, @Body() updateTodo) : any
    {
      console.log(`Todo à modifier : ${id}`)
      console.log(`Corp de la todo : `)
      console.log(updateTodo)
      return `Todo ${id} bien modifiée`
    }


    @Delete(':id')
    deleteTodo(@Param("id") id) : any
    {
      return `Todo ${id} bien supprimée`
    }

  
}
