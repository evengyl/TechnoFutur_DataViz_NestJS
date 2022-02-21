import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query } from "@nestjs/common";
import { UsersService } from "src/shared/users.service";
import { TodosDTO } from "./dto/todos.dto";
import { Todos } from "./models/Todos.model";
import { TodosService } from "./todos.service";

@Controller("api/todos")
export class TodosController {

  /*
    GET:localhost:3000/api/todos/         ->get all todos GET
    -- GET:localhost:3000/api/todos?max=15 -> get all todos GET query -> 15 max 
    GET:localhost:3000/api/todos/42       ->get one todo GET
    POST:localhost:3000/api/todos/        ->post un nouveau todo POST
    PUT/PATCH:localhost:3000/api/todos/42 -> put/patch permet la modification d'un todo PUT/PATCH
    DELETE:localhost:3000/api/todos/42    -> delete un todo DELETE
  */
 
    constructor(private usersService : UsersService, private todosService : TodosService) {}
 
    @Get()
    getAll(@Query("max") max : number) : Todos[]
    {
      if(max)
      {
        let listTodosSorted = this.todosService.getAllByMax(max)
        
        if(listTodosSorted)
        {
          return listTodosSorted
        }
        else
        {
          throw new BadRequestException("Le paramètre max n'est pas valable")
        }
      }
      else
        return this.todosService.getAll()
    }

    @Get(":id")
    getOneById(@Param('id') id : number) : Todos
    {
      const todoFinded = this.todosService.getOneById(id)

      if(todoFinded)
        return todoFinded
      else
        throw new NotFoundException('Todo non trouvé dans la méthode GetOne')

    }

    @Post()
    postTodo(@Body() todo : TodosDTO) : Todos
    {
      return this.todosService.postTodo(todo)
    }

    @Patch(':id')
    updateTodo(@Param('id') id : number, @Body() updateTodo : TodosDTO) : Todos
    {
      const todo = this.getOneById(id)
      return this.todosService.updateTodo(todo, updateTodo)
    }


    @Delete(':id')
    deleteTodo(@Param("id") id : number) : { [key : string] : string }
    {
      const todoToDelete = this.getOneById(id)
      return this.todosService.deleteTodo(todoToDelete)
    }
}