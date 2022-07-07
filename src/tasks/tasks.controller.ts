import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Task } from './task.model';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from '@/tasks/dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-task-filter.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.createTask(createTaskDto);
  }

  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
    if (!Object.keys(filterDto).length) return this.tasksService.getAllTasks();
    return this.tasksService.getTasksWithFilters(filterDto);
  }

  @Get('/:id')
  getTaskById(@Param('id') id: Task['id']): Task {
    return this.tasksService.getTaskById(id);
  }

  @Put('/:id')
  updateTaskById(
    @Param('id') id: Task['id'],
    @Body() updateTaskDto: UpdateTaskDto,
  ): Task | string {
    return this.tasksService.updateTaskById(id, updateTaskDto);
  }

  @Delete('/:id')
  deleteTaskById(@Param('id') id: Task['id']): string {
    return this.tasksService.deleteTaskById(id);
  }
}
