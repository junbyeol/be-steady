import { Service } from 'typedi';
import { DB } from '@database';
import { Task } from '@interfaces/tasks.interface';
import { CreateTaskDto } from '@dtos/tasks.dto';
import { HttpException } from '@/exceptions/httpException';

@Service()
export class TaskService {
  public async createTask(taskData: CreateTaskDto): Promise<Task> {
    const findProject = await DB.Projects.findByPk(taskData.projectId);
    if (!findProject) throw new HttpException(404, 'Project not found');

    const datetime = new Date(taskData.datetime);
    const createTaskData: Task = await DB.Tasks.create({ ...taskData, datetime });
    return createTaskData;
  }

  public async findAllTasksByProjectId(projectId: string): Promise<Task[]> {
    const tasks: Task[] = await DB.Tasks.findAll({ where: { projectId }, order: [['datetime', 'DESC']] });
    return tasks;
  }
}
