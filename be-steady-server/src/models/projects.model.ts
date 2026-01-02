import { DataTypes, Sequelize, Optional, Model } from 'sequelize';
import { Project } from '@interfaces/projects.interface';

export type ProjectCreationAttributes = Optional<Project, 'id' | 'title' | 'imageUrl'>;

export class ProjectModel extends Model<Project, ProjectCreationAttributes> implements Project {
  public id: string;
  public title: string;
  public imageUrl?: string;

  public readonly createdAt: Date;
  public readonly updatedAt: Date;
}

export default function (sequelize: Sequelize): typeof ProjectModel {
  ProjectModel.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: 'projects',
      sequelize,
    },
  );

  return ProjectModel;
}
