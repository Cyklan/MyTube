import { PrismaClient } from '@prisma/client'
import { hashPassword } from 'App/utils/hashPassword'
const prisma = new PrismaClient()

async function main() {
  const password = await hashPassword('startpw+1')

  await prisma.user.create({
    data: {
      isAdmin: true,
      password,
      username: 'Admin',
    },
  })

  await prisma.settings.create({
    data: {
      registrationActive: true,
    },
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (error) => {
    console.error(error)
    await prisma.$disconnect()
    process.exit(1)
  })
