import { createLogger, transports, format } from 'winston';

const customFormat = format.combine(
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  format.label({ label: `Worker ${process.pid}` }),
  format.errors({ stack: true }),
  format.printf(info => {
    return `${info.level.toUpperCase()} [${info.timestamp}] (${info.label}): ${info.message}`;
  })
);

const devLogger = () => {
  return createLogger({
    format: customFormat,
    transports: [new transports.Console()],
  });
};

export const logger = devLogger();
