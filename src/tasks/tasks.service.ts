import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateTaskDto } from './dto/update-task.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { PrismaService } from 'src/prisma.service';


@Injectable()
export class TasksService {

  constructor(private prisma: PrismaService) {}

  getTasks() {
    return this.prisma.tasks.findMany();
  }

  getTask(id: string) {
    const taskFound = this.prisma.tasks.findUnique({
      where: {
        id: id,
      }
    });

    //Manera tradicional de hacer validaciones
    // if(!taskFound) return { message: 'Task not found', status: 404 };

    //Manera de hacer validaciones con nestJS

    if (!taskFound) {
      return new NotFoundException(`Task with id ${id} not found`);
    }

    return taskFound;
  }

  createTask(task: CreateTaskDto) {
    return this.prisma.tasks.create({ data: task });
  }

  updateTask(task: UpdateTaskDto) {
    console.log(task);
    return 'Task updated successfully';
  }

  deleteTask() {
    return 'Task deleted successfully';
  }

  patchTask() {
    return 'Task patched successfully';
  }
}
