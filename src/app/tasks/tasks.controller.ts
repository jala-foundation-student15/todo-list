import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
  ParseBoolPipe,
} from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { ApiTags, ApiQuery } from "@nestjs/swagger";
import { IFindTasksOptions } from "./interfaces/tasks.interfaces";

@ApiTags("tasks")
@Controller("tasks")
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @ApiQuery({ name: "page", required: false, type: Number })
  @ApiQuery({ name: "limit", required: false, type: Number })
  @ApiQuery({ name: "withDeleted", required: false, type: Boolean })
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query("page", new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query("limit", new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
    @Query("withDeleted", new DefaultValuePipe(false), ParseBoolPipe)
    withDeleted: boolean = false,
  ) {
    const options: IFindTasksOptions = {
      page,
      limit: limit > 10 ? 10 : limit,
      withDeleted,
    };

    return this.tasksService.findAll(options);
  }

  @Get(":id")
  @HttpCode(HttpStatus.OK)
  async findOne(@Param("id", new ParseUUIDPipe()) id: string) {
    return this.tasksService.findOne(id);
  }

  @Patch(":id")
  @HttpCode(HttpStatus.OK)
  async update(
    @Param("id", new ParseUUIDPipe()) id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.tasksService.update(id, updateTaskDto);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param("id", new ParseUUIDPipe()) id: string) {
    return this.tasksService.remove(id);
  }
}
