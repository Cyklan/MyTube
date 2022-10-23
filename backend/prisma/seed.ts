import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  await prisma.user.create({
    data: {
      isAdmin: true,
      password: '$2b$10$FYf2M0h7wI14pBFU40Bvl.d.gX4ZIaihECg/uwIFuLXH7Z2m.sXHi',
      username: 'Admin',
    },
  })

  await prisma.settings.create({
    data: {
      registrationActive: true,
      allowSelfAccountDeletion: true,
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
