import {
  IsEmpty,
  IsNotEmpty,
  IsDateString,
  IsString,
  IsEnum,
  IsOptional,
} from "class-validator";
import { TaskCategory, TaskStatus } from "../entities/task.entity";
import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";

export class CreateTaskDto {
  @ApiHideProperty()
  @IsEmpty()
  id: string;

  @ApiProperty({ example: "YYYY-MM-DD" })
  @IsNotEmpty()
  @IsDateString({ strict: true })
  dueDate: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(TaskCategory)
  category: TaskCategory;

  @ApiProperty()
  @IsOptional()
  @IsEnum(TaskStatus)
  status: TaskStatus;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiHideProperty()
  @IsEmpty()
  createdAt: Date;

  @ApiHideProperty()
  @IsEmpty()
  updatedAt: Date;

  @ApiHideProperty()
  @IsEmpty()
  deletedAt: Date;
}
