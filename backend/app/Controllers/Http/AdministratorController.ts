import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import type { RequestContract } from '@ioc:Adonis/Core/Request'
import { User } from '@prisma/client'
import db from 'App/Database'
import { ErrorResponse } from 'App/ResponseMessages/ErrorResponse'
import { MissingRequiredKeyResponse } from 'App/ResponseMessages/MissingRequiredKeyResponse'
import { getUserById, getUserByName } from 'App/utils/getUser'
import { hashPassword } from 'App/utils/hashPassword'
import { validatePasswordRequirements } from 'App/utils/validatePasswordRequirements'

export default class AdministratorController {
  public async getAccounts({ response }: HttpContextContract) {
    const accounts = await db.user.findMany()

    return response.json(accounts)
  }

  public async createAccount({ request, response }: HttpContextContract) {
    const { username, password, isAdmin } = request.only(['username', 'password', 'isAdmin']) as {
      username: string
      password: string
      isAdmin: boolean
    }

    if (!validatePasswordRequirements(password)) {
      return response.badRequest(new ErrorResponse('Thats some weak ass password')) // WAP - Cardi B
    }

    const user = await getUserByName(username)
    if (user) {
      return response.badRequest(new ErrorResponse('Username already taken'))
    }

    const hashedPassword = await hashPassword(password)

    await db.user.create({
      data: {
        isAdmin: isAdmin ?? false,
        password: hashedPassword,
        username,
      },
    })
    response.status(204).send('')
  }

  public async deleteAccount({ request, response }: HttpContextContract) {
    const { userId } = request.only(['userId'])

    if (this.isASelfManipulation(request)) {
      return response.badRequest(new ErrorResponse("You mustn't delete yourself"))
    }

    const userToDelete = await getUserById(userId)
    if (!userToDelete) {
      return response.status(204).send('')
    }

    await db.user.delete({
      where: {
        id: userId,
      },
    })
    response.status(204).send('')
  }

  public async updateAccountPassword({ request, response }: HttpContextContract) {
    const { userId, password } = request.only(['userId', 'password']) as {
      userId: string
      password: string
    }

    const userToUpdate = await getUserById(userId)
    if (!userToUpdate) {
      return response.badRequest(new ErrorResponse('Invalid user'))
    }

    if (!validatePasswordRequirements(password)) {
      return response.badRequest(new ErrorResponse('Thats some weak ass password')) // WAP - Cardi B
    }

    const hashedPassword = await hashPassword(password)

    await db.user.update({
      where: {
        id: userId,
      },
      data: { password: hashedPassword },
    })

    response.status(204).send('')
  }

  public async updateAccountAdmin({ request, response }: HttpContextContract) {
    const { userId, isAdmin } = request.only(['userId', 'isAdmin']) as {
      userId: string
      isAdmin: boolean
    }

    if (isAdmin == null) {
      return response.badRequest(new MissingRequiredKeyResponse('isAdmin'))
    }

    if (this.isASelfManipulation(request)) {
      return response.badRequest(new ErrorResponse('You must not make yourself not admin'))
    }

    const userToUpdate = await getUserById(userId)
    if (!userToUpdate) {
      return response.badRequest(new ErrorResponse('Invalid user'))
    }

    await db.user.update({
      where: {
        id: userId,
      },
      data: { isAdmin },
    })
    response.status(204).send('')
  }

  public async updateSettings({ request, response }: HttpContextContract) {
    const { registrationActive } = request.only(['registrationActive']) as {
      registrationActive: boolean
    }

    if (registrationActive == null) {
      return response.badRequest(new MissingRequiredKeyResponse('registrationActive'))
    }

    const settings = await db.settings.findFirst()
    await db.settings.update({
      where: {
        id: settings?.id,
      },
      data: {
        registrationActive,
      },
    })

    response.status(204).send('')
  }

  public async deleteVideo({ request, response }: HttpContextContract) {
    // TODO: implement
    throw new Error()
  }

  private isASelfManipulation(request: RequestContract): boolean {
    const { userId } = request.only(['userId'])
    const user: User = request['user']
    return user.id === userId
  }
}
