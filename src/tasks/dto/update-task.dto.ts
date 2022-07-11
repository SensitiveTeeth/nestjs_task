import { IsEnum } from 'class-validator';
import { TaskStatus } from '../task-status.enum';
import { CreateTaskDto } from './create-task.dto';

export class UpdateTaskDto extends CreateTaskDto {
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
