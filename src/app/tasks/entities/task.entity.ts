import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from "typeorm";

export enum TaskCategory {
  STUDY = "study",
  WORK = "work",
  SELF_CARE = "self care",
}

export enum TaskStatus {
  PENDING = "pending",
  IN_PROGRESS = "in progress",
  COMPLETE = "complete",
  OVERDUE = "overdue",
}

@Entity("tasks")
export class Task {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "date" })
  dueDate: Date;

  @Column({ type: "enum", enum: TaskCategory })
  category: TaskCategory;

  @Column({ type: "enum", enum: TaskStatus, default: TaskStatus.PENDING })
  status: TaskStatus;

  @Column({ type: "text" })
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
