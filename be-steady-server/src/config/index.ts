import { config } from 'dotenv';
import path from 'path';

// .env 파일이 없어도 에러를 내지 않으며, NODE_ENV가 없을 경우 development를 기본값으로 사용합니다.
config({ path: path.join(process.cwd(), `.env.${process.env.NODE_ENV || 'development'}.local`) });

export const CREDENTIALS = process.env.CREDENTIALS === 'true';
export const { NODE_ENV, PORT, SECRET_KEY, LOG_FORMAT, ORIGIN } = process.env;
export const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_DATABASE } = process.env;

// LOG_DIR은 기본값을 제공하여 에러를 방지합니다.
export const LOG_DIR = process.env.LOG_DIR || '../../logs';
