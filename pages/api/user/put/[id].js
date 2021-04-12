const fp = require('lodash/fp');
const knex = require('../../../../database');
// const Users = require('../../../../data');

module.exports = PutUserById = async (req, res) => {
  const { id } = req.query;

  // Update user
  await knex('users').update({ name: 'Ricky Gwapo' }).where('id', id);

  // Get user
  const userResponse = await knex('users').where('id', id);

  if (fp.isEmpty(userResponse)) {
    return res.status(404).json({ message: `User with id: ${id} not found.` })
  }
  // Users[index].name = 'Ricky Gwapo';

  res.status(200).json(userResponse[0])
}
