import { AppController } from './app.controller';
import { Module } from '@nestjs/common';
import { TodosModule } from './todos/todos.module';
import { UsersModule } from './users/users.module';
import { UsersService } from './shared/users.service';

@Module({
  imports: [TodosModule, UsersModule],
  controllers: [AppController],
  providers: []
})
export class AppModule { }
