import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query } from "@nestjs/common";
import { UsersService } from "src/shared/users.service";
import { Todos } from "./models/Todos.model";

@Controller("api/todos")
export class TodosController {

    listTodos : Todos[]

    constructor(private usersService : UsersService) {
      this.listTodos = []


      this.listTodos.push({
        name : "Loic",
        userId : 1,
        desc : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        dateCreated : new Date(),
        dateUpdated : null
      })

      this.listTodos.push({
        name : "Stéphanie",
        userId : 2,
        desc : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        dateCreated : new Date(),
        dateUpdated : null
      })

      this.listTodos.push({
        name : "Adrien",
        userId : 3,
        desc : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        dateCreated : new Date(),
        dateUpdated : null
      })

      this.listTodos.push({
          userId : 4,
          name : "Angélique",
          desc : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          dateCreated : new Date(),
          dateUpdated : null
        }
      )


    }
  /*
    GET:localhost:3000/api/todos/         ->get all todos GET
    -- GET:localhost:3000/api/todos?max=15 -> get all todos GET query -> 15 max 
    GET:localhost:3000/api/todos/42       ->get one todo GET
    POST:localhost:3000/api/todos/        ->post un nouveau todo POST
    PUT/PATCH:localhost:3000/api/todos/42 -> put/patch permet la modification d'un todo PUT/PATCH
    DELETE:localhost:3000/api/todos/42    -> delete un todo DELETE
  */

 
    @Get()
    getAll(@Query("max") max : number) : Todos[]
    {
      if(max)
      {
        let sorted = this.listTodos.length - max
        if(sorted > 0)
        {
          sorted = sorted * -1
          let listTodoTemp = [...this.listTodos]
          return listTodoTemp.slice(0, sorted)
          
        }
        throw new BadRequestException("Le paramètre max n'est pas valable")
      }
      else
        return this.listTodos
    }

    @Get(":id")
    getOneById(@Param('id') id : number) : Todos
    {
      const todoFinded = this.listTodos.find(todo => todo.userId == id)

      if(todoFinded)
        return todoFinded
      else
        throw new NotFoundException('Todo non trouvé dans la méthode GetOne')

    }

    @Post()
    postTodo(@Body() todo : Todos) : Todos
    {
      const newTodo = new Todos()
      const { name, desc } = todo
      newTodo.name = name
      newTodo.desc = desc
      newTodo.dateCreated = new Date()
      newTodo.dateUpdated = null
      newTodo.userId = this.listTodos.length + 1

      this.listTodos.push(newTodo)

      return this.listTodos.find(todo => todo.userId == newTodo.userId)
    }

    @Patch(':id')
    updateTodo(@Param('id') id : number, @Body() updateTodo : Todos) : Todos
    {
      //const todo = {...this.getOneById(id)} //Je force la création d'une COPIE !!!!
      const todo = this.getOneById(id) //Travail par référence à l'objet !
      
      todo.name = updateTodo.name ? updateTodo.name : todo.name
      todo.desc = updateTodo.desc ? updateTodo.desc : todo.desc

      return todo
    }


    @Delete(':id')
    deleteTodo(@Param("id") id : number) : { [key : string] : string }
    {
      const todo = this.getOneById(id)

      const indexTodo = this.listTodos.findIndex(item => item.userId == todo.userId)

      this.listTodos.splice(indexTodo, 1)

      return { message : `Todo ${id} bien supprimée` }
    }
}