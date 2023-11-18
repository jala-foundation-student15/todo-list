import {
  IsEmpty,
  IsNotEmpty,
  IsDateString,
  IsString,
  IsEnum,
  IsOptional,
} from "class-validator";
import { TaskStatus } from "../entities/task.entity";

export class CreateTaskDto {
  @IsEmpty()
  id: string;

  @IsNotEmpty()
  @IsDateString({ strict: true })
  dueDate: string;

  @IsOptional()
  @IsEnum(TaskStatus)
  status: TaskStatus;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsEmpty()
  createdAt: Date;

  @IsEmpty()
  updatedAt: Date;

  @IsEmpty()
  deletedAt: Date;
}
