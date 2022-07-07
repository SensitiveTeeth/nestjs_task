import { IsEnum } from 'class-validator';
import { TaskStatus } from '../task.model';
import { CreateTaskDto } from './create-task.dto';

export class UpdateTaskDto extends CreateTaskDto {
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
