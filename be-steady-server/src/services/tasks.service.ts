import { Service } from 'typedi';
import { DB } from '@database';
import { Task, TaskOverview } from '@interfaces/tasks.interface';
import { CreateTaskDto } from '@dtos/tasks.dto';
import { HttpException } from '@/exceptions/HttpException';
import { WhereOptions, Op } from 'sequelize';
import { getTzDateString } from '@utils/date';
import { TaskModel } from '@models/tasks.model';

@Service()
export class TaskService {
  public async createTask(taskData: CreateTaskDto): Promise<Task> {
    const findProject = await DB.Projects.findByPk(taskData.projectId);
    if (!findProject) throw new HttpException(404, 'Project not found');

    const datetime = new Date(taskData.datetime);
    const createTaskData: Task = await DB.Tasks.create({ ...taskData, datetime });
    return createTaskData;
  }

  public async findAllTasks(projectId: string, fromDate?: string, toDate?: string): Promise<Task[]> {
    const where: WhereOptions<Task> = { projectId };
    if (fromDate && toDate) {
      where.datetime = { [Op.between]: [fromDate, toDate] };
    } else if (fromDate) {
      where.datetime = { [Op.gte]: fromDate };
    } else if (toDate) {
      where.datetime = { [Op.lte]: toDate };
    }

    const tasks: Task[] = await DB.Tasks.findAll({
      where,
      order: [['datetime', 'DESC']],
    });
    return tasks;
  }

  public async findTaskOverviewByProjectId(projectId: string): Promise<TaskOverview> {
    const nTotalTasks = await DB.Tasks.count({ where: { projectId } });
    const firstDateString = await DB.Tasks.min<string, TaskModel>('datetime', { where: { projectId } });
    const lastDateString = await DB.Tasks.max<string, TaskModel>('datetime', { where: { projectId } });
    const firstDate = firstDateString ? new Date(firstDateString) : undefined;
    const lastDate = lastDateString ? new Date(lastDateString) : undefined;

    const timezone = '+09:00';
    // 타임존이 반영된 날짜 추출용 Sequelize 함수 정의
    const dateWithTimezone = DB.Sequelize.fn('DATE', DB.Sequelize.fn('CONVERT_TZ', DB.Sequelize.col('datetime'), '+00:00', timezone));

    // 모든 고유 날짜를 내림차순으로 조회 (인덱스 활용)
    const tasks = await DB.Tasks.findAll({
      attributes: [[dateWithTimezone, 'date']],
      where: { projectId },
      group: [dateWithTimezone],
      order: [[dateWithTimezone, 'DESC']],
      raw: true,
    });

    const dates = tasks.map((t: any) => t.date);

    let recentTaskDaysStreak = 0;
    let maxTaskDaysStreak = 0;

    if (dates.length > 0) {
      const yesterdayStr = getTzDateString(timezone, 1);

      // 1. Recent Task Days Streak 계산 (어제부터 과거로 역산)
      // dates 배열에서 '어제' 날짜가 어디 있는지 찾습니다.
      const yesterdayIdx = dates.indexOf(yesterdayStr);

      if (yesterdayIdx !== -1) {
        recentTaskDaysStreak = 1; // 어제 했으므로 최소 1일 시작

        for (let i = yesterdayIdx + 1; i < dates.length; i++) {
          const current = new Date(dates[i - 1]);
          const previous = new Date(dates[i]);

          // 두 날짜의 차이 계산 (일 단위)
          const diffDays = Math.round((current.getTime() - previous.getTime()) / (1000 * 60 * 60 * 24));

          if (diffDays === 1) {
            recentTaskDaysStreak++;
          } else {
            break; // 하루라도 끊기면 즉시 중단
          }
        }
      }

      // 2. Max Streak 계산 (전체 기록 중 가장 긴 구간)
      let currentMax = 1;
      let tempMax = 1;

      for (let i = 1; i < dates.length; i++) {
        const d1 = new Date(dates[i - 1]);
        const d2 = new Date(dates[i]);
        const diffDays = Math.round((d1.getTime() - d2.getTime()) / (1000 * 60 * 60 * 24));

        if (diffDays === 1) {
          currentMax++;
        } else {
          tempMax = Math.max(tempMax, currentMax);
          currentMax = 1;
        }
      }
      maxTaskDaysStreak = Math.max(tempMax, currentMax);
    }

    return {
      nTotalTasks,
      firstDate: firstDate ? new Date(firstDate) : undefined,
      lastDate: lastDate ? new Date(lastDate) : undefined,
      recentTaskDaysStreak,
      maxTaskDaysStreak,
    };
  }
}
