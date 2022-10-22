import { PrismaClient } from '@prisma/client'
import { genSalt, hash } from 'bcrypt'
const prisma = new PrismaClient()

async function main() {

  const salt = await genSalt(10)
  const password = await hash("startpw+1", salt)

  await prisma.user.create({
    data: {
      isAdmin: true,
      password,
      username: 'Admin',
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
