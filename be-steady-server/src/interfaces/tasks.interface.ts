export interface Task {
  id?: string;
  datetime: Date;
  projectId: string; // FK
}
