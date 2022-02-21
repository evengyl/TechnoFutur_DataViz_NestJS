import { Module } from "@nestjs/common";
import { UsersService } from "src/shared/users.service";
import { TodosController } from "./todos.controller";

@Module({
    controllers : [TodosController],
    providers : [UsersService]
})
export class TodosModule {}