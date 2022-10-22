import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import type { ResponseContract } from '@ioc:Adonis/Core/Response'
import bcrypt, { genSalt, hash } from 'bcrypt'
import db from 'App/Database'
import { ErrorResponse } from 'App/ResponseMessages/ErrorResponse'
import { sign } from 'jsonwebtoken'

export default class AuthenticationController {
  public async login({ request, response }: HttpContextContract) {
    const { username, password } = request.only(['username', 'password'])

    const user = await this.getUser(username)
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
    const { username, password } = request.only(['username', 'password'])
    // https://ihateregex.io/expr/password/
    const isValidPassword = new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/g).test(password)
    if (!isValidPassword) {
      return response.badRequest(new ErrorResponse('Thats some weak ass password')) // WAP - Cardi B
    }
    
    const user = await this.getUser(username)
    if (user) {
      return response.badRequest(new ErrorResponse('Username already taken'))
    }

    const salt = await genSalt(10)
    const hashedPassword = await hash(password, salt)

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

  private getUser(username: string) {
    return db.user.findFirst({
      where: {
        username,
      },
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
