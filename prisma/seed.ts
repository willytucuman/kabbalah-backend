import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';
import { USERS, CATEGORIES, PRODUCTS } from '../src/utils/data';
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
  const dataUsers = USERS.map((user) => ({
    ...user,
    password: hashedPassword,
    createdAt: faker.date.recent(),
  }));
  await prisma.user.createMany({ data: dataUsers });

  // ###################################
  // ############ CATEGORIES
  // ###################################
  const createdCategories = await Promise.all(
    CATEGORIES.map((category) =>
      prisma.category.create({
        data: category,
      }),
    ),
  );

  // ###################################
  // ############ PRODUCTS
  // ###################################
  const createdProducts = await Promise.all(
    PRODUCTS.map((product) =>
      prisma.product.create({
        data: {
          ...product,
          categories: {
            create: [
              {
                category: {
                  connect: { id: createdCategories[0].id }, // Asigna el producto a la primera categoría
                },
              },
            ],
          },
        },
      }),
    ),
  );

  // ###################################
  // ############ ORDERS
  // ###################################
  const users = await prisma.user.findMany();
  const products = await prisma.product.findMany();

  // Crear órdenes para cada usuario
  await Promise.all(
    users.map(async (user) => {
      const order = await prisma.order.create({
        data: {
          userId: user.id,
          total: 0, // Se calculará dinámicamente
          status: 'pending',
          items: {
            create: [
              {
                productId: products[0].id,
                quantity: faker.number.int({ min: 1, max: 5 }),
                price: products[0].price,
              },
              {
                productId: products[1].id,
                quantity: faker.number.int({ min: 1, max: 5 }),
                price: products[1].price,
              },
            ],
          },
        },
        include: { items: true },
      });

      // Calcular el total de la orden
      const total = order.items.reduce(
        (sum, item) => sum + item.quantity * item.price,
        0,
      );

      // Actualizar el total de la orden
      await prisma.order.update({
        where: { id: order.id },
        data: { total },
      });
    }),
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });