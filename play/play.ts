import { createLogger, colors } from '../src/index';

const logger = createLogger({
  reporter: {
    error: ({ message, type, timestamp, icon, color }, options) => {
      console.log(`[${timestamp}] ${icon} ${message}`);
    }, // This will override the default reporter for error level
  },
  // reporterOverride: ({ message, type, timestamp, icon, color }, options) => {
  //   console.log(`[${timestamp}] ${icon} ${message}`);
  // }, // Level that aren't custom configured will fallback to this reporter
});
logger.info('Info');
logger.error('Error');
logger.debug('Debug');
logger.fail('Fail');
logger.fatal('Fatal');
logger.log('Log');
logger.warn('Warn');
logger.verbose('Verbose');
logger.trace('Trace');
logger.success('Sucess');

console.log(colors.bgRed('Hello world!'));
console.log(colors.red(colors.underline('Hello world!')));
