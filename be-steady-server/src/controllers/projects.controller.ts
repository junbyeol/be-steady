import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { Project } from '@interfaces/projects.interface';
import { CreateProjectDto } from '@dtos/projects.dto';
import { ProjectService } from '@services/projects.service';

export class ProjectController {
  public project = Container.get(ProjectService);

  public getProject = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const projectData = req.params.id;
      const project: Project = await this.project.getProject(projectData);
      res.status(200).json(project);
    } catch (error) {
      next(error);
    }
  };

  public createProject = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const projectData: CreateProjectDto = req.body;
      const createProjectData: Project = await this.project.createProject(projectData);

      res.status(201).json(createProjectData);
    } catch (error) {
      next(error);
    }
  };
}
