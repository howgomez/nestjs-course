import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
@Controller('tasks')
export class TaskController {
  constructor(private tasksService: TasksService) {
    this.tasksService = tasksService;
  }

  @ApiOperation({ summary: 'Get all tasks' })
  @ApiResponse({ status: 200, description: 'Return all tasks' })
  @ApiResponse({ status: 404, description: 'Task not found' })
  @Get()
  getAllTasks(@Query() query: any) {
    console.log(query);
    return this.tasksService.getTasks();
  }

  @ApiOperation({ summary: 'Get a task by id' })
  @Get('/:id')
  getTask(@Param('id') id: string) {
    return this.tasksService.getTask(id);
  }

  @ApiOperation({ summary: 'Create a task' })
  @Post()
  @UsePipes(new ValidationPipe())
  createTask(@Body() task: CreateTaskDto) {
    return this.tasksService.createTask(task);
  }

  @ApiOperation({ summary: 'Update a task' })
  @Put()
  updateTask(@Body() task: UpdateTaskDto) {
    return this.tasksService.updateTask(task);
  }

  @ApiOperation({ summary: 'Delete a task' })
  @Delete()
  deleteTask() {
    return this.tasksService.deleteTask();
  }

  @ApiOperation({ summary: 'Patch a task' })
  @Patch()
  patchTask() {
    return this.tasksService.patchTask();
  }
}
