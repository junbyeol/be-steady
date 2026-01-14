import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { TaskService } from '@services/tasks.service';
import { CreateTaskDto } from '@dtos/tasks.dto';
import { Task } from '@interfaces/tasks.interface';

export class TaskController {
  public task = Container.get(TaskService);

  public createTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const taskData: CreateTaskDto = req.body;
      const createTaskData: Task = await this.task.createTask(taskData);

      res.status(201).json(createTaskData);
    } catch (error) {
      next(error);
    }
  };

  public findAllTasksByProjectId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const projectId: string = req.params.projectId;
      const tasks: Task[] = await this.task.findAllTasksByProjectId(projectId);

      res.status(200).json(tasks);
    } catch (error) {
      next(error);
    }
  };
}
