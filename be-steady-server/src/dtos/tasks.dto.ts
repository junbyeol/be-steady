import { IsDateString, IsString, IsNotEmpty } from 'class-validator';

export class CreateTaskDto {
  @IsDateString()
  @IsNotEmpty()
  public datetime: string;

  @IsString()
  @IsNotEmpty()
  public projectId: string;
}

export class FindAllTasksByProjectIdDto {
  @IsString()
  @IsNotEmpty()
  public projectId: string;
}