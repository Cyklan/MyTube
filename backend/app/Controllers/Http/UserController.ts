import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { User } from '@prisma/client'
import db from 'App/Database'
import { ErrorResponse } from 'App/ResponseMessages/ErrorResponse'
import { getUserById } from 'App/utils/getUser'
import { hashPassword } from 'App/utils/hashPassword'
import { validatePasswordRequirements } from 'App/utils/validatePasswordRequirements'

export default class UserController {
  public async get({ request, response }: HttpContextContract) {
    const id = request.qs().userId ?? undefined
    const username = request.qs().username ?? undefined
    let user: User | null = null

    if (username) {
      user = await db.user.findFirst({
        where: {
          username,
        },
      })
    } else if (id) {
      user = await db.user.findFirst({
        where: {
          id: id,
        },
      })
    }

    if (user == null) {
      return response.badRequest(new ErrorResponse('Invalid user'))
    }

    user.password = ''

    return response.json(user)
  }

  public async subscribe({ request, response }: HttpContextContract) {
    const { userId } = request.only(['userId'])
    const user = request['user'] as User
    const userToSubscribeTo = await getUserById(userId)

    if (userToSubscribeTo == null) {
      return response.badRequest(new ErrorResponse('Invalid user'))
    }

    await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        subscribedTo: {
          connect: { id: userToSubscribeTo.id },
        },
      },
    })
  }

  public async unsubscribe({ request, response }: HttpContextContract) {}

  public async updatePassword({ request, response }: HttpContextContract) {
    const { password } = request.only(['password']) as {
      password: string
    }
    const user = request['user']

    if (!validatePasswordRequirements(password)) {
      return response.badRequest(new ErrorResponse('Thats some weak ass password')) // WAP - Cardi B
    }

    const hashedPassword = await hashPassword(password)

    await db.user.update({
      where: {
        id: user.id,
      },
      data: { password: hashedPassword },
    })

    response.status(204).send('')
  }

  public async delete({ request, response }: HttpContextContract) {
    const settings = await db.settings.findFirst()
    if (!settings?.allowSelfAccountDeletion) {
      return response.badRequest(new ErrorResponse('User deletion unavailable'))
    }

    const { userId } = request.only(['userId'])
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
}
