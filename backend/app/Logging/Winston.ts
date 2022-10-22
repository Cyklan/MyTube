import winston from 'winston'
import DailyRotateFile from 'winston-daily-rotate-file'

const logger = winston.createLogger({
  level: 'verbose',
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

const logRequest = (ip: string, method: string, url: string) => {
  logger.info(`REQUEST: ${ip} - ${method} - ${url}`)
}

const logResponse = (ip: string, method: string, url: string, body?: object) => {
  let message = `RESPONSE: ${ip} - ${method} - ${url}`
  if (body) {
    message += ` - BODY: ${JSON.stringify(body)}`
  }

  logger.info(message)
}

export { logRequest, logResponse }
