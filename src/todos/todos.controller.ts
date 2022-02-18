import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { Todos } from "./models/Todos.model";

@Controller("api/todos")
export class TodosController {
    constructor() {}
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
      console.log(max)
      return [ 
        {
          name : "Loic",
          userId : 1,
          desc : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          dateCreated : new Date(),
          dateUpdated : null
        }, 
        {
          name : "Stéphanie",
          userId : 2,
          desc : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          dateCreated : new Date(),
          dateUpdated : null
        },
        {
          name : "Adrien",
          userId : 3,
          desc : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          dateCreated : new Date(),
          dateUpdated : null
        }
      ]
    }

    @Get(":id")
    getOneById(@Param('id') id : number) : Todos
    {
      return {
        userId : id,
        name : "Angélique",
        desc : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        dateCreated : new Date(),
        dateUpdated : null
      }
    }

    @Post()
    postTodo(@Body() newTodo : Todos) : Todos
    {
      console.log(newTodo)
      return {
        userId : 2,
        name : "Angélique",
        desc : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        dateCreated : new Date(),
        dateUpdated : null
      }
    }

    @Patch(':id')
    updateTodo(@Param('id') id : number, @Body() updateTodo : Todos) : { [key : string] : string }
    {
      console.log(`Todo à modifier : ${id}`)
      console.log(`Corp de la todo : `)
      console.log(updateTodo)
      return { message : `Todo ${id} bien modifiée` }
    }


    @Delete(':id')
    deleteTodo(@Param("id") id : number) : { [key : string] : string }
    {
      return { message : `Todo ${id} bien supprimée` }
    }
}