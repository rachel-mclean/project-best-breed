
exports.up = function(knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.text('email').notNullable();
    table.text('password').notNullable();
    table.text('username').notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
