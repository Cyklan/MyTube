import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { logRequest } from 'App/Logging/Winston'

export default class LogRequest {
  public async handle({ request }: HttpContextContract, next: () => Promise<void>) {
    // code for middleware goes here. ABOVE THE NEXT CALL
    logRequest(request.ip(), request.method(), request.url())
    await next()
  }
}
