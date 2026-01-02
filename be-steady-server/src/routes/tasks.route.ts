import { TaskController } from '@/controllers/tasks.controller';
import { Routes } from '@/interfaces/routes.interface';
import { Router } from 'express';
import { ValidationMiddleware } from '@/middlewares/validation.middleware';
import { CreateTaskDto } from '@/dtos/tasks.dto';

export class TaskRoute implements Routes {
  public path = '/tasks';
  public router = Router();
  public task = new TaskController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, ValidationMiddleware(CreateTaskDto), this.task.createTask);
    this.router.get(`${this.path}/project/:projectId`, this.task.findAllTasksByProjectId);
  }
}
