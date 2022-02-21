import { Injectable } from '@nestjs/common';
import { TodosDTO } from './dto/todos.dto';
import { Todos } from './models/Todos.model';

@Injectable()
export class TodosService {

    listTodos : Todos[]

    constructor()
    {
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


    getAll() : Todos[]
    {
        return this.listTodos
    }

    getAllByMax(max : number) : Todos[]
    {
          let sorted = this.listTodos.length - max
          if(sorted > 0)
          {
            sorted = sorted * -1
            let listTodoTemp = [...this.listTodos]
            return listTodoTemp.slice(0, sorted)
          }
    }

    getOneById(id : number) : Todos
    {
        const todoFinded = this.listTodos.find(todo => todo.userId == id)

        return todoFinded
    }

    postTodo(todo : TodosDTO) : Todos
    {
      const newTodo = new Todos()
      const { name, desc } = todo
      newTodo.name = name
      newTodo.desc = desc
      newTodo.dateCreated = new Date()
      newTodo.dateUpdated = null
      newTodo.assignId(this.listTodos.length)

      this.listTodos.push(newTodo)

      return this.listTodos.find(todo => todo.userId == newTodo.userId)
    }

   
    updateTodo(oldTodo : Todos, updateTodo : TodosDTO) : Todos
    {
        oldTodo.name = updateTodo.name ? updateTodo.name : oldTodo.name
        oldTodo.desc = updateTodo.desc ? updateTodo.desc : oldTodo.desc
        oldTodo.dateUpdated = new Date()

      return oldTodo
    }


    
    deleteTodo(todo : Todos) : { [key : string] : string }
    {
      const indexTodo = this.listTodos.findIndex(item => item.userId == todo.userId)

      this.listTodos.splice(indexTodo, 1)

      return { message : `Todo ${todo.userId} bien supprimée` }
    }
}
