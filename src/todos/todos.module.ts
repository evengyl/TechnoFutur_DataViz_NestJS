import { Module } from "@nestjs/common";
import { UsersService } from "src/shared/users.service";
import { TodosController } from "./todos.controller";
import { TodosService } from './todos.service';

@Module({
    controllers : [TodosController],
    providers : [UsersService, TodosService]
})
export class TodosModule {}