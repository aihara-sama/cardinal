declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: string;
    PORT: string;
    DATABASE_URL: string;
    SESSION_SECRET: string;
    SESSION_MAX_AGE: string;
    SESSION_CHECK_PERIOD: string;
  }
}
