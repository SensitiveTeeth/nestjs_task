import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Task } from './task.model';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from '@/tasks/create-task.dto';
@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.createTask(createTaskDto);
  }

  @Get()
  getAllTasks(): Task[] {
    return this.tasksService.getAllTasks();
  }

  @Get('/:id')
  getTaskById(@Param('id') id: Task['id']): Task {
    return this.tasksService.getTaskById(id);
  }

  @Put('/:id')
  updateTaskById(
    @Param('id') id: Task['id'],
    @Body() createTaskDto: CreateTaskDto,
  ): Task | string {
    return this.tasksService.updateTaskById(id, createTaskDto);
  }

  @Delete('/:id')
  deleteTaskById(@Param('id') id: Task['id']): string {
    return this.tasksService.deleteTaskById(id);
  }
}
