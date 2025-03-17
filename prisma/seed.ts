import { faker } from '@faker-js/faker';
import { Prisma, PrismaClient } from '@prisma/client';
import { USERS } from '../src/utils/data';
import { hashPassword } from '../src/utils/password';

const prisma = new PrismaClient();

async function main() {
  // ###################################
  // ############ USERS
  // ###################################
  const hashedPassword = await hashPassword('Pass1234');
  await prisma.user.create({
    data: {
      name: 'superadmin',
      lastName: 'superadmin',
      email: 'superadmin@gmail.com',
      birthDate: faker.date.birthdate(),
      nationality: 'Argentina',
      password: hashedPassword,
      role: 'SUPERADMIN',
    },
  });
  await prisma.user.create({
    data: {
      name: 'admin',
      lastName: 'admin',
      email: 'admin@gmail.com',
      birthDate: faker.date.birthdate(),
      nationality: 'Argentina',
      password: hashedPassword,
      role: 'ADMIN',
    },
  });
  const dataUsers: Prisma.UserCreateManyInput[] = USERS.map((user) => ({
    ...user,
    password: hashedPassword,
    createdAt: faker.date.recent(),
  }));
  await prisma.user.createMany({
    data: dataUsers,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
