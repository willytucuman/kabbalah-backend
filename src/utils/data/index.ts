import { faker } from '@faker-js/faker';

// Datos falsos para usuarios
export const USERS = [
  {
    name: 'Gastón',
    lastName: 'Danielsen',
    email: 'gastondanielsen85@gmail.com',
    birthDate: faker.date.birthdate(),
    nationality: 'Argentina',
    isDeleted: false,
  },
  {
    name: 'Facundo',
    lastName: 'Veneziano',
    email: 'facundo.e.veneziano@gmail.com',
    birthDate: faker.date.birthdate(),
    nationality: 'Argentina',
    isDeleted: false,
  },
  {
    name: 'user1',
    lastName: 'user1',
    email: 'user1@gmail.com',
    birthDate: faker.date.birthdate(),
    nationality: 'Argentina',
    isDeleted: false,
  },
  {
    name: 'user2',
    lastName: 'user2',
    email: 'user2@gmail.com',
    birthDate: faker.date.birthdate(),
    nationality: 'Argentina',
    isDeleted: false,
  },
  {
    name: 'user3',
    lastName: 'user3',
    email: 'user3@gmail.com',
    birthDate: faker.date.birthdate(),
    nationality: 'Argentina',
    isDeleted: false,
  },
  {
    name: 'user4',
    lastName: 'user4',
    email: 'user4@gmail.com',
    birthDate: faker.date.birthdate(),
    nationality: 'Argentina',
    isDeleted: false,
  },
  {
    name: 'user5',
    lastName: 'user5',
    email: 'user5@gmail.com',
    birthDate: faker.date.birthdate(),
    nationality: 'Argentina',
    isDeleted: false,
  },
  {
    name: 'user6',
    lastName: 'user6',
    email: 'user6@gmail.com',
    birthDate: faker.date.birthdate(),
    nationality: 'Argentina',
    isDeleted: false,
  },
  {
    name: 'user7',
    lastName: 'user7',
    email: 'user7@gmail.com',
    birthDate: faker.date.birthdate(),
    nationality: 'Argentina',
    isDeleted: false,
  },
  {
    name: 'user8',
    lastName: 'user8',
    email: 'user8@gmail.com',
    birthDate: faker.date.birthdate(),
    nationality: 'Argentina',
    isDeleted: false,
  },
  {
    name: 'user9',
    lastName: 'user9',
    email: 'user9@gmail.com',
    birthDate: faker.date.birthdate(),
    nationality: 'Argentina',
    isDeleted: false,
  },
  {
    name: 'user10',
    lastName: 'user10',
    email: 'user10@gmail.com',
    birthDate: faker.date.birthdate(),
    nationality: 'Argentina',
    isDeleted: false,
  },
];


// Datos falsos para categorías
export const CATEGORIES = [
  { name: 'Electrónica', description: 'Productos electrónicos' },
  { name: 'Ropa', description: 'Ropa para hombres, mujeres y niños' },
  { name: 'Hogar', description: 'Artículos para el hogar' },
  { name: 'Deportes', description: 'Equipamiento deportivo' },
  { name: 'Juguetes', description: 'Juguetes para niños' },
];

// Datos falsos para productos
export const PRODUCTS = [
  {
    name: 'Smartphone X',
    description: 'Un smartphone de última generación',
    price: 799.99,
    stock: 100,
    imageUrl: faker.image.urlLoremFlickr({ category: 'technology' }),
  },
  {
    name: 'Laptop Pro',
    description: 'Laptop potente para trabajo y juegos',
    price: 1299.99,
    stock: 50,
    imageUrl: faker.image.urlLoremFlickr({ category: 'technology' }),
  },
  {
    name: 'Camiseta Casual',
    description: 'Camiseta cómoda y elegante',
    price: 29.99,
    stock: 200,
    imageUrl: faker.image.urlLoremFlickr({ category: 'fashion' }),
  },
  {
    name: 'Sofá Moderno',
    description: 'Sofá cómodo y moderno para tu hogar',
    price: 499.99,
    stock: 30,
    imageUrl: faker.image.urlLoremFlickr({ category: 'home' }),
  },
  {
    name: 'Balón de Fútbol',
    description: 'Balón oficial para partidos profesionales',
    price: 49.99,
    stock: 150,
    imageUrl: faker.image.urlLoremFlickr({ category: 'sports' }),
  },
];