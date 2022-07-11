import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-task-filter.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TasksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository)
    private tasksRepository: TasksRepository,
  ) {}
  // createTask(createTaskDto: CreateTaskDto) {
  //   const { title, description } = createTaskDto;
  //   const task: Task = {
  //     id: uuid(),
  //     title,
  //     description,
  //     status: TaskStatus.OPEN,
  //   };
  //   this.tasks.push(task);
  //   return task;
  // }
  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }

  async getTaskById(id: Task['id']): Promise<Task> {
    const found = await this.tasksRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    return found;
  }

  // getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
  //   const { status, search } = filterDto;
  //   let tasks = this.getAllTasks();
  //   if (status) {
  //     tasks = tasks.filter((task: Task) => task.status === status);
  //   }
  //   if (search) {
  //     tasks = tasks.filter((tasks: Task) => {
  //       return (
  //         tasks.title.includes(search) || tasks.description.includes(search)
  //       );
  //     });
  //   }
  //   return tasks;
  // }
  // updateTaskById(id: Task['id'], updateTaskDto: UpdateTaskDto): Task | string {
  //   const targetTask = this.getTaskById(id);
  //   for (const index in updateTaskDto) {
  //     const item = updateTaskDto[index];
  //     targetTask[index] = item;
  //   }
  //   return targetTask;
  // }
  // deleteTaskById(id: Task['id']): string {
  //   const found = this.getTaskById(id);
  //   this.tasks.filter((task: Task) => task.id === found.id);
  //   return `Task with id ${id} has been removed`;
  // }
}
