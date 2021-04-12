const knex = require('../../../../database');

module.exports = handler = async (req, res) => {
  const Users = await knex('users');

  res.status(200).json(Users)
}
