import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { Project } from '@interfaces/projects.interface';
import { CreateProjectDto } from '@dtos/projects.dto';
import { ProjectService } from '@services/projects.service';

export class ProjectController {
  public project = Container.get(ProjectService);

  public createProject = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const projectData: CreateProjectDto = req.body;
      const createProjectData: Project = await this.project.createProject(projectData);

      res.status(201).json({ data: createProjectData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };
}
