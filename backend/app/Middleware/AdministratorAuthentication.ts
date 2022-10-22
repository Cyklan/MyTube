import { User } from '@prisma/client'
import Authentication from './Authentication'

export default class AdministratorAuthentication extends Authentication {
  protected canAuthenticate = (user: User) => user.isAdmin
}
