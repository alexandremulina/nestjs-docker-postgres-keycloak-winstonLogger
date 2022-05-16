import { WinstonModuleOptions } from 'nest-winston';
import { utilities as nestWinstonModuleUtilities } from 'nest-winston';
import * as winston from 'winston';

export const winstonConfig: WinstonModuleOptions = {
  levels: winston.config.npm.levels,
  level: 'verbose',
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({ stack: true }),
        winston.format.splat(),
        winston.format.ms(),
        winston.format.json(),
        nestWinstonModuleUtilities.format.nestLike('Order', {
          prettyPrint: true,
        }),
      ),
    }),
    new winston.transports.File({
      level: 'debug',
      filename: 'application.log',
      dirname: 'logs',
      format: winston.format.combine(
        winston.format.timestamp({
          format: 'YYYY-MM-DD hh:mm:ss A ZZ',
        }),
        winston.format.json(),
      ),
      handleExceptions: true,
    }),
  ],
};
