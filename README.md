<p align="center">
<a href="https://www.npmjs.com/package/unloger" target="_blank" rel="noopener noreferrer">
<img src="https://api.iconify.design/codicon:debug-console.svg?color=%2336d920" alt="logo" width='100'/></a>
</p>

<p align="center">
  Logger for Node.js
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/unloger" target="_blank" rel="noopener noreferrer"><img src="https://badge.fury.io/js/unloger.svg" alt="NPM Version" /></a>
  <a href="https://www.npmjs.com/package/unloger" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/npm/dt/unloger.svg?logo=npm" alt="NPM Downloads" /></a>
  <a href="https://bundlephobia.com/result?p=unloger" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/bundlephobia/minzip/unloger" alt="Minizip" /></a>
  <a href="https://github.com/hunghg255/unloger/graphs/contributors" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/badge/all_contributors-1-orange.svg" alt="Contributors" /></a>
  <a href="https://github.com/hunghg255/unloger/blob/main/LICENSE" target="_blank" rel="noopener noreferrer"><img src="https://badgen.net/github/license/hunghg255/unloger" alt="License" /></a>
</p>

## Installation

```bash
npm i unloger
```

## Usage

### Import already created instance. You can't configure it.

```ts
import { logger } from 'unloger';

logger.info('Hello World!');
```

### Create your own instance and configure it.

```ts
import { createLogger } from 'unloger';

export const logger = createLogger(options: LoggerConfig);
```

See [`LoggerConfig`][api-logger-config] for more details.

### Creating your own reporter

- There are two types of reporters:
  - [`ReporterLevels`][api-reporter-levels]
  - [`ReporterOverride`][api-reporter-override]
- Within ReporterLevels you can create a reporter for each log level. These without a reporter will use the default reporter or the reporterOverride if it is set.

```ts
import { createLogger } from 'unloger';

const logger = createLogger({
  reporter: {
    error: ({ message, type, timestamp, icon, color }, options) => {
      console.log(`[${timestamp}] ${icon} ${message}`);
    }, // This will override the default reporter for error level
  },
  reporterOverride: ({ message, type, timestamp, icon, color }, options) => {
    console.log(`[${timestamp}] ${icon} ${message}`);
  }, // Level that aren't custom configured will fallback to this reporter
});
```

## Types

#### LoggerConfig

```ts
export type LoggerConfig = Partial<{
  level: number;
  files: Partial<{
    path: string; // Path to the folder where the logs will be saved
    extension: 'text' | 'json';
    fileName: string; // Name of the file
  }>;
  format: Partial<{
    colors: boolean;
    timestamp: boolean;
  }>;
  reporter: ReporterLevels;
  reporterOverride: ReporterOverride;
}>;
```

#### ReporterLevels

```ts
export type ReporterLevels = Partial<{
  [key in LogType]: (
    { message, type, timestamp, icon, color }: ReporterObject,
    options: LoggerConfig,
  ) => void;
}>;
```

#### ReporterOverride

```ts
// If this reporterOverride is set in a logger instance, it will override level that aren't custom configured
export type ReporterOverride = (
  { message, type, timestamp, icon, color }: ReporterObject,
  options: LoggerConfig,
) => void;
```

## Use color

```ts
import { color } from 'unloger/color';
```

### Types

```ts
declare const color:
  | {
      reset: (string: string) => string;
      bold: (string: string) => string;
      dim: (string: string) => string;
      italic: (string: string) => string;
      underline: (string: string) => string;
      inverse: (string: string) => string;
      hidden: (string: string) => string;
      strikethrough: (string: string) => string;
      black: (string: string) => string;
      red: (string: string) => string;
      green: (string: string) => string;
      yellow: (string: string) => string;
      blue: (string: string) => string;
      magenta: (string: string) => string;
      cyan: (string: string) => string;
      white: (string: string) => string;
      gray: (string: string) => string;
      bgBlack: (string: string) => string;
      bgRed: (string: string) => string;
      bgGreen: (string: string) => string;
      bgYellow: (string: string) => string;
      bgBlue: (string: string) => string;
      bgMagenta: (string: string) => string;
      bgCyan: (string: string) => string;
      bgWhite: (string: string) => string;
      blackBright: (string: string) => string;
      redBright: (string: string) => string;
      greenBright: (string: string) => string;
      yellowBright: (string: string) => string;
      blueBright: (string: string) => string;
      magentaBright: (string: string) => string;
      cyanBright: (string: string) => string;
      whiteBright: (string: string) => string;
      bgBlackBright: (string: string) => string;
      bgRedBright: (string: string) => string;
      bgGreenBright: (string: string) => string;
      bgYellowBright: (string: string) => string;
      bgBlueBright: (string: string) => string;
      bgMagentaBright: (string: string) => string;
      bgCyanBright: (string: string) => string;
      bgWhiteBright: (string: string) => string;
    }
  | {
      [x: string]: StringConstructor;
    };

export { color };
```

[api-logger-config]: #loggerconfig
[api-reporter-levels]: #reporterlevels
[api-reporter-override]: #reporteroverride
[license]: license
[author]: https://github.com/malezjaa
