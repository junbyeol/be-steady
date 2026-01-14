import { Routes } from '@/interfaces/routes.interface';
import { Router } from 'express';
import { ValidationMiddleware } from '@/middlewares/validation.middleware';
import { CreateProjectDto } from '@/dtos/projects.dto';
import { ProjectController } from '@/controllers/projects.controller';

export class ProjectRoute implements Routes {
  public path = '/projects';
  public router = Router();
  public project = new ProjectController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, ValidationMiddleware(CreateProjectDto), this.project.createProject);
    this.router.get(`${this.path}/:id(\\d+)`, this.project.getProject);
  }
}
