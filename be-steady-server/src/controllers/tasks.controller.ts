import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { TaskService } from '@services/tasks.service';
import { CreateTaskDto, ProjectIdDto, FindAllTasksQueryDto } from '@dtos/tasks.dto';
import { Task, TaskOverview } from '@interfaces/tasks.interface';

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

  public findAllTasks = async (req: Request<ProjectIdDto, {}, {}, FindAllTasksQueryDto>, res: Response, next: NextFunction) => {
    try {
      const projectId = req.params.projectId;
      const fromDate = req.query.fromDate;
      const toDate = req.query.toDate;
      const tasks: Task[] = await this.task.findAllTasks(projectId, fromDate, toDate);

      res.status(200).json(tasks);
    } catch (error) {
      next(error);
    }
  };

  public getTaskOverviewByProjectId = async (req: Request<ProjectIdDto, {}, {}, {}>, res: Response, next: NextFunction) => {
    try {
      const projectId = req.params.projectId;
      const taskOverview: TaskOverview = await this.task.findTaskOverviewByProjectId(projectId);
      res.status(200).json(taskOverview);
    } catch (error) {
      next(error);
    }
  };
}
