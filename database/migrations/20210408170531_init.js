
exports.up = function(knex) {
  return knex.schema.createTable('users', table => {
    table.increments('id');
    table.string('name').notNullable();
    table.string('height');
    table.string('mass');
    table.string('hair_color');
    table.string('skin_color');
    table.string('eye_color');
    table.string('gender');
    table.timestamps(true, true);
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
