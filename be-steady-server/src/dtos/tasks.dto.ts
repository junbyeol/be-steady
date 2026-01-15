import { IsDateString, IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateTaskDto {
  @IsDateString()
  @IsNotEmpty()
  public datetime: string;

  @IsString()
  @IsNotEmpty()
  public projectId: string;
}

export class ProjectIdDto {
  @IsString()
  @IsNotEmpty()
  public projectId: string;
}

export class FindAllTasksQueryDto {
  @IsDateString()
  @IsOptional()
  public fromDate?: string;

  @IsDateString()
  @IsOptional()
  public toDate?: string;
}
