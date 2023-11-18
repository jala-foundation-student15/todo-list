import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { Task } from "./entities/task.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { MessagesHelper } from "src/app/tasks/helpers/messages.helper";
import { IFindTasksOptions } from "./interfaces/tasks.interfaces";
import { paginate } from "nestjs-typeorm-paginate";

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto) {
    const newTask = this.tasksRepository.create(createTaskDto);

    return await this.tasksRepository.save(newTask);
  }

  async findAll(options: IFindTasksOptions) {
    const { page, limit } = options;

    return paginate<Task>(
      this.tasksRepository,
      { page, limit },
      {
        where: {},
        order: {},
      },
    );
  }

  async findOne(id: string) {
    const task = await this.tasksRepository.findOne({ where: { id } });

    if (!task) {
      throw new NotFoundException(MessagesHelper.TASK_NOT_FOUND);
    }

    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    const task = await this.findOne(id);

    this.tasksRepository.merge(task, updateTaskDto);

    return await this.tasksRepository.save(task);
  }

  async remove(id: string) {
    const task = await this.findOne(id);

    return await this.tasksRepository.softRemove(task);
  }
}
