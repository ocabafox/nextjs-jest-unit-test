const knex = require('../../../../database');

module.exports = GetUserById = async (req, res) => {
  const { id } = req.query;
  const userResponse = await knex('users').where('id', id);

  // User with id exists
  if (userResponse.length > 0) {
    res.status(200).json(userResponse[0])
  } else {
    res.status(404).json({ message: `User with id: ${id} not found.` })
  }
}
