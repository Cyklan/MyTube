import winston from 'winston'
import DailyRotateFile from 'winston-daily-rotate-file'
const { combine, timestamp, json } = winston.format

const getLogger = (name: string) => {
  return winston.createLogger({
    level: 'verbose',
    format: combine(timestamp(), json()),
    defaultMeta: { name },
    transports: [
      new DailyRotateFile({
        datePattern: 'YYYY-MM-DD',
        dirname: 'logs',
        filename: 'mytube-%DATE%.log',
        maxSize: '20m',
        maxFiles: '30d',
      }),
    ],
  })
}

export { getLogger }
