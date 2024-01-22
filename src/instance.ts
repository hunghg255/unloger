/* eslint-disable indent */
// @ts-nocheck
import fs from 'node:fs';
import path from 'node:path';

import defu from 'defu';

import { colors } from './color';
import { LogEntry, LoggerConfig, LogLevels, ReporterObject } from './types';
import { icons, join, logColors, strWidth } from './utils';

class ConsoleInstance {
  options: LoggerConfig = {};
  logEntries: LogEntry[] = [];

  constructor(options: LoggerConfig) {
    this.options = defu(options, <LoggerConfig>{
      level: 5,
      format: {
        colors: true,
        timestamp: true,
      },
      reporterOverride: (level: ReporterObject) => {
        let line;
        const isBadge = LogLevels[level.type] < 2;
        const columns = process.stdout.columns || 80;

        line = isBadge
          ? level.color.bg(colors.black(' ' + level.type.toUpperCase() + ' '))
          : level.color.text(level.icon);

        const left = `${line} ${level.message}`;

        const right = join(
          level.timestamp ? colors.gray(level.timestamp.toLocaleTimeString()) : undefined,
        );

        const space = columns - strWidth(left) - strWidth(right) - 2;

        line =
          space > 0 && (columns || 0) >= 80
            ? left + ' '.repeat(space) + right
            : (right ? `${colors.gray(`[${right}]`)} ` : '') + left;
        console.log(line);
      },
      reporter: {},
    });
  }

  updateFile(level: Pick<ReporterObject, 'message' | 'type'>) {
    const fullPath = path.join(
      this.options.files?.path.replace('{cwd}', process.cwd()),
      this.options.files?.fileName +
        `${this.options.files.extension === 'text' ? '.txt' : '.json'}`,
    );

    this.createFileIfNeeded(fullPath);

    if (this.options.files.extension === 'text') {
      fs.appendFileSync(fullPath, `${new Date()} [${level.type.toUpperCase()}] ${level.message}\n`);
    } else if (this.options.files.extension === 'json') {
      try {
        const logFileContent = fs.readFileSync(fullPath, 'utf8');
        this.logEntries = JSON.parse(logFileContent);
      } catch {
        this.logEntries = [];
      }

      const logEntry: LogEntry = {
        timestamp: `${new Date()}`,
        level: level.type,
        message: level.message,
      };
      this.logEntries.push(logEntry);
      fs.writeFileSync(fullPath, JSON.stringify(this.logEntries));
    }
  }

  createFileIfNeeded(fullPath: string) {
    const dirPath = path.dirname(fullPath);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    if (!fs.existsSync(fullPath)) {
      fs.writeFileSync(fullPath, '');
    }
  }

  logMessage(level: Pick<ReporterObject, 'message' | 'type'>) {
    const { message, type } = level;

    if (this.options.files) {
      this.updateFile(level);
    }

    const reporter = Object.keys(this.options.reporter).includes(type)
      ? this.options.reporter[type]
      : this.options.reporterOverride;

    reporter(
      {
        message,
        type,
        timestamp: this.options.format.timestamp ? new Date() : undefined,
        icon: icons[type],
        color: this.options.format.colors
          ? {
              text: colors[logColors[type]],
              bg: colors[`bg${logColors[type].charAt(0).toUpperCase() + logColors[type].slice(1)}`],
            }
          : undefined,
      },
      this.options,
    );
  }

  public error(message: string) {
    this.logMessage({ message, type: 'error' });
  }

  public fatal(message: string) {
    this.logMessage({ message, type: 'fatal' });
  }

  public ready(message: string) {
    this.logMessage({ message, type: 'ready' });
  }

  public warn(message: string) {
    this.logMessage({ message, type: 'warn' });
  }

  public info(message: string) {
    this.logMessage({ message, type: 'info' });
  }

  public success(message: string) {
    this.logMessage({ message, type: 'success' });
  }

  public debug(message: string) {
    this.logMessage({ message, type: 'debug' });
  }

  public trace(message: string) {
    this.logMessage({ message, type: 'trace' });
  }

  public fail(message: string) {
    this.logMessage({ message, type: 'fail' });
  }

  public start(message: string) {
    this.logMessage({ message, type: 'start' });
  }

  public log(message: string) {
    this.logMessage({ message, type: 'log' });
  }

  public verbose(message: string) {
    this.logMessage({ message, type: 'verbose' });
  }
}

export const createLogger = (options: LoggerConfig = {}) => {
  return new ConsoleInstance(options);
};

export const logger = createLogger();
