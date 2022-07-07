import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './create-task.dto';
import { GetTasksFilterDto } from './get-task-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  createTask(createTaskDto: CreateTaskDto) {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: Task['id']): Task | undefined {
    const result = this.tasks.find((task: Task) => task.id === id);
    if (!result) throw new NotFoundException();
    return result;
  }

  getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
    const { status, search } = filterDto;
    let tasks = this.getAllTasks();

    if (status) {
      tasks = tasks.filter((task: Task) => task.status === status);
    }

    if (search) {
      tasks = tasks.filter((tasks: Task) => {
        return (
          tasks.title.includes(search) || tasks.description.includes(search)
        );
      });
    }

    return tasks;
  }

  updateTaskById(id: Task['id'], createTaskDto: CreateTaskDto): Task | string {
    const targetTask = this.getTaskById(id);
    if (!targetTask) return `Task with id ${id} not found`;
    for (const index in createTaskDto) {
      const item = createTaskDto[index];
      targetTask[index] = item;
    }
    return targetTask;
  }

  deleteTaskById(id: Task['id']): string {
    const result = this.getTaskById(id);
    if (!result) return `Task with id ${id} not found`;
    this.tasks.filter((task: Task) => task.id === id);
    return `Task with id ${id} has been removed`;
  }
}
