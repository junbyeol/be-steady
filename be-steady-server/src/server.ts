import { App } from '@/app';
import { AuthRoute } from '@routes/auth.route';
import { UserRoute } from '@routes/users.route';
import { ProjectRoute } from '@routes/projects.route';
import { TaskRoute } from '@routes/tasks.route';
import { ValidateEnv } from '@utils/validateEnv';

ValidateEnv();

const app = new App([new AuthRoute(), new UserRoute(), new ProjectRoute(), new TaskRoute()]);

(async () => {
  try {
    await app.initialize();
    app.listen();
  } catch (error) {
    console.error('Failed to initialize the app:', error);
    process.exit(1);
  }
})();
