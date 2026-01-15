import { Routes } from '@/interfaces/routes.interface';
import { Router } from 'express';
import { ValidationMiddleware } from '@/middlewares/validation.middleware';
import { CreateProjectDto } from '@/dtos/projects.dto';
import { ProjectController } from '@/controllers/projects.controller';
import { TaskController } from '@/controllers/tasks.controller';

export class ProjectRoute implements Routes {
  public path = '/projects';
  public router = Router();
  public project = new ProjectController();
  public task = new TaskController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, ValidationMiddleware(CreateProjectDto), this.project.createProject);
    this.router.get(`${this.path}/:id(\\d+)`, this.project.getProject);
    this.router.get(`${this.path}/:projectId(\\d+)/task`, this.task.findAllTasks);
    this.router.get(`${this.path}/:projectId(\\d+)/task/overview`, this.task.getTaskOverviewByProjectId);
  }
}
