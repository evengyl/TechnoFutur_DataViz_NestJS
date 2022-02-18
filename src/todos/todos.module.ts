import { Module } from "@nestjs/common";
import { AppService } from "src/app.service";
import { TodosController } from "./todos.controller";

@Module({
    controllers : [TodosController]
})
export class TodosModule {}