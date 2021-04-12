const Dotenv = require('dotenv');

Dotenv.config({ path: `${__dirname}/../.env` });
module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: process.env.DB_NAME || 'unit_test_db',
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USERNAME || 'postgreslocal',
      password: process.env.DB_PASSWORD || 'postgreslocal'
    },
    seeds: {
      directory: './database/seeds'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
};
