export interface Task {
  id?: string;
  datetime: Date;
  projectId: string; // FK
}

export interface TaskOverview {
  firstDate?: Date;
  lastDate?: Date;
  nTotalTasks: number;
  recentTaskDaysStreak: number; // 오늘 제외 며칠 연속인지
  maxTaskDaysStreak: number; // 최대 연속 일수
}
