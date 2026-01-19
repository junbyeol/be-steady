import { Service } from 'typedi';
import { Project } from '@interfaces/projects.interface';
import { CreateProjectDto } from '@dtos/projects.dto';
import { HttpException } from '@/exceptions/HttpException';
import { DB } from '@database';
import ShortUniqueId from 'short-unique-id';

@Service()
export class ProjectService {
  private uid = new ShortUniqueId({ length: 6 });

  public async getAllProjects(): Promise<Project[]> {
    const projects = await DB.Projects.findAll();
    return projects;
  }

  public async getProject(id: string): Promise<Project> {
    const project = await DB.Projects.findOne({ where: { id } });
    if (!project) throw new HttpException(404, 'Project not found');
    return project;
  }

  public async createProject(projectData: CreateProjectDto): Promise<Project> {
    let loopCount = 0;
    while (loopCount < 10) {
      const id = this.uid.rnd();
      if (await DB.Projects.findOne({ where: { id } })) {
        loopCount++;
        continue;
      }
      const createProjectData: Project = await DB.Projects.create({ ...projectData, id });
      return createProjectData;
    }
    throw new HttpException(500, 'Failed to create project');
  }
}
