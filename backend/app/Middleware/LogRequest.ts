import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import type { RequestContract } from '@ioc:Adonis/Core/Request'
import type { ResponseContract } from '@ioc:Adonis/Core/Response'
import { ErrorResponse } from 'App/ResponseMessages/ErrorResponse'
import { getLogger } from '../Logging/Winston'

export default class LogRequest {
  private static messageNumber = 0
  private logger = getLogger('HTTP')

  public async handle({ request, response }: HttpContextContract, next: () => Promise<void>) {
    const messageNumber = LogRequest.messageNumber
    LogRequest.messageNumber += 1

    // code for middleware goes here. ABOVE THE NEXT CALL
    this.logRequest(request, messageNumber)

    if (process.env.NODE_ENV === 'production') {
      try {
        await next()
      } catch (error) {
        this.logError({ error }, messageNumber)
        response.status(500).json(new ErrorResponse(error.message))
      }
    } else if (process.env.NODE_ENV === 'development') {
      await next()
    }

    response.response.on('finish', () => {
      this.logResponse(response, messageNumber)
    })
  }

  private logRequest(request: RequestContract, messageNumber: number): void {
    const ip = request.ip()
    const method = request.method()
    const url = request.url()
    const body = request.body()
    const headers = request.headers()

    this.logger.info(JSON.stringify({ ip, method, url, headers, body, messageNumber }))
  }

  private logResponse(responseContract: ResponseContract, messageNumber: number): void {
    const response = responseContract.response
    const statusCode = response.statusCode
    const statusMessage = response.statusMessage
    const body = responseContract.getBody()
    const headers = responseContract.getHeaders()

    this.logger.info(JSON.stringify({ statusCode, statusMessage, headers, body, messageNumber }))
  }

  private logError(error: any, messageNumber: number): void {
    this.logger.error(JSON.stringify({ statusCode: 500, statusMessage: error, messageNumber }))
  }
}
