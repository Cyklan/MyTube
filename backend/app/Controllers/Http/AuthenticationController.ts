import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import type { ResponseContract } from '@ioc:Adonis/Core/Response'
import bcrypt from 'bcrypt'
import db from 'App/Database'
import { ErrorResponse } from 'App/ResponseMessages/ErrorResponse'
import { sign } from 'jsonwebtoken'
import { validatePasswordRequirements } from 'App/utils/validatePasswordRequirements'
import { hashPassword } from 'App/utils/hashPassword'
import { getUserByName } from 'App/utils/getUser';

export default class AuthenticationController {
  public async login({ request, response }: HttpContextContract) {
    const { username, password } = request.only(['username', 'password'])

    const user = await getUserByName(username)
    if (!user) {
      return response.badRequest(new ErrorResponse('Invalid user or password'))
    }

    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) {
      return response.badRequest(new ErrorResponse('Invalid user or password'))
    }

    return this.generateTokenResponse(user.id, response)
  }

  public async register({ request, response }: HttpContextContract) {
    const settings = await db.settings.findFirst()
    if (!settings?.registrationActive) {
      return response.badRequest(new ErrorResponse('Registration unavailable'))
    }

    const { username, password } = request.only(['username', 'password'])
    if (!validatePasswordRequirements(password)) {
      return response.badRequest(new ErrorResponse('Thats some weak ass password')) // WAP - Cardi B
    }

    const user = await getUserByName(username)
    if (user) {
      return response.badRequest(new ErrorResponse('Username already taken'))
    }

    const hashedPassword = await hashPassword(password)

    const registeredUser = await db.user.create({
      data: {
        isAdmin: false,
        password: hashedPassword,
        username,
      },
    })

    return this.generateTokenResponse(registeredUser.id, response)
  }

  private generateTokenResponse(userId: string, response: ResponseContract) {
    const token = this.generateToken(userId)
    return response.json({
      token,
    })
  }

  private generateToken(id: string): string {
    return sign(
      {
        sub: id,
      },
      process.env.APP_KEY!
    )
  }
}
