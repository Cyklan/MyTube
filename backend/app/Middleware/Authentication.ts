import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import type { RequestContract } from '@ioc:Adonis/Core/Request'
import { ErrorResponse } from 'App/ResponseMessages/ErrorResponse'
import { JwtPayload, verify } from 'jsonwebtoken'
import { getUserById } from 'App/utils/getUser';
import { User } from '@prisma/client'

export default class Authentication {
  public async handle({ request, response }: HttpContextContract, next: () => Promise<void>) {
    const jwt = this.getJwt(request);
    if (!jwt) {
      return response.unauthorized(new ErrorResponse('Missing bearer token'))
    }

    const payload = this.getPayload(jwt)
    if (!payload) {
      return response.unauthorized(new ErrorResponse('Invalid JWT'))
    }

    const user = await getUserById(payload.sub!)
    if (!user) {
      return response.unauthorized(new ErrorResponse('Unknown User'))
    }

    if (!this.canAuthenticate(user)) {
      return response.unauthorized(new ErrorResponse('Unauthorized'))
    }

    request["user"] = user

    await next()
  }

  protected canAuthenticate(_: User): boolean {
    return true;
  }

  protected getJwt(request: RequestContract) {
    const authHeader = request.headers().authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null;
    }

   return authHeader.split(' ')[1]
  }

  protected getPayload(jwt: string): JwtPayload | null {
    let payload: JwtPayload | null = null
    try {
      payload = verify(jwt, process.env.APP_KEY!) as JwtPayload
    } catch {}

    return payload
  }
}
