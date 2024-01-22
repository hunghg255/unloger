export type ColorFunction = (text: string | number) => string;

export type LoggerConfig = Partial<{
  level: number;
  files: Partial<{
    path: string;
    extension: 'text' | 'json';
    fileName: string;
  }>;
  format: Partial<{
    colors: boolean;
    timestamp: boolean;
  }>;
  reporter: ReporterLevels;
  reporterOverride: ReporterOverride;
}>;

export type ReporterLevels = Partial<{
  [key in LogType]: (
    { message, type, timestamp, icon, color }: ReporterObject,
    options: LoggerConfig,
  ) => void;
}>;

// If reporterOverride is set in a logger instance, it will override level that aren't custom configured
export type ReporterOverride = (
  { message, type, timestamp, icon, color }: ReporterObject,
  options: LoggerConfig,
) => void;

export type ReporterObject = {
  message: string;
  type: LogType;
  timestamp: Date;
  icon: string;
  color: {
    text: ColorFunction;
    bg: ColorFunction;
  };
};

export interface LogEntry {
  timestamp: number | string;
  level: string;
  message: string;
}

export const LogLevels: Record<LogType, number> = {
  fatal: 0,
  error: 0,
  warn: 1,
  log: 2,
  info: 3,
  success: 3,
  fail: 3,
  ready: 3,
  start: 3,
  debug: 4,
  trace: 5,
  verbose: 5,
};

export type LogType =
  // ? level 0
  | 'error'
  | 'fatal'
  // ? level 1
  | 'warn'
  // ? level 2
  | 'log'
  // ? level 3
  | 'fail'
  | 'info'
  | 'success'
  | 'start'
  | 'ready'
  //
  | 'verbose'
  | 'trace'
  | 'debug';
