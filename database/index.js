const knex = require('knex');
const knexFile = require('../knexfile');

// Todo put the .env config here
const database = knex(knexFile.development);
module.exports = database;
