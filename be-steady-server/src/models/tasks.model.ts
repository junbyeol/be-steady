import { DataTypes, Sequelize, Optional, Model } from 'sequelize';
import { Task } from '@interfaces/tasks.interface';
import { ProjectModel } from './projects.model';

export type TaskCreationAttributes = Optional<Task, 'id' | 'datetime' | 'projectId'>;

export class TaskModel extends Model<Task, TaskCreationAttributes> implements Task {
  public id: string;
  public datetime: Date;

  public projectId: string; // FK

  public createdAt: Date;
  public updatedAt: Date;
}

export default function (sequelize: Sequelize): typeof TaskModel {
  TaskModel.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      datetime: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      projectId: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: ProjectModel,
          key: 'id',
        },
      },
    },
    {
      tableName: 'tasks',
      indexes: [
        {
          name: 'projectId_datetime_index',
          fields: ['project_id', 'datetime'],
        },
      ],
      sequelize,
    },
  );

  return TaskModel;
}
