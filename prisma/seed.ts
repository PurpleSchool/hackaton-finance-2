import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
  const rubl = await prisma.currency.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: 'рубль',
      shortName: 'руб',
      logoUrl: '',
    },
  })
  const dollar = await prisma.currency.upsert({
    where: { id: 2 },
    update: {},
    create: {
      name: 'доллар',
      shortName: 'дол',
      logoUrl: '',
    },
  })
  const euro = await prisma.currency.upsert({
    where: { id: 3 },
    update: {},
    create: {
      name: 'евро',
      shortName: 'евр',
      logoUrl: '',
    },
  })
  console.log({ rubl, dollar, euro })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })