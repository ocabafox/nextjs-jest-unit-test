const userMock = require('../mocks/users');

exports.seed = async function (knex) {

  const tableName = 'users';

  await knex.raw(`DELETE FROM ${tableName}`);
  await knex.raw(`ALTER SEQUENCE ${tableName}_id_seq RESTART WITH 1`);
  return knex(tableName)
    .then(async () => {
      try {
        const insertedUsers = await knex(tableName).insert(userMock);

        await knex.raw('select setval(\'users_id_seq\', max(id)) from users');
        return insertedUsers;
      }
      catch (error) {
        if (error.message.indexOf('violates unique constraint "users_pkey"') > -1){
          return console.log('SEED ALREADY EXISTS');
        }

        throw error;
      }
    });
};
