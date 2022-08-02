import { ConnectionOptions } from 'typeorm';

console.log('PostgreSQL Host - DB_HOST - ', process.env.DB_HOST);
console.log('PostgreSQL Port - DB_PORT - ', process.env.DB_PORT);
console.log('PostgreSQL Database - DB_NAME - ', process.env.DB_NAME);

const dbOptions: ConnectionOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT) || 5433,
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'orders_db',
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: process.env.NODE_ENV === 'production' ? false : true,
  migrations: ['dist/src/database/migrations/**/*.js'],
  cli: {
    migrationsDir: 'src/database/migrations',
  },
};

export = dbOptions;
