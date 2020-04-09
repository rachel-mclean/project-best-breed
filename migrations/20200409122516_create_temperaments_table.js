
exports.up = function(knex) {
  return knex.schema.createTable('temperaments', (table) => {
    table.increments('id').primary();
    table.text('temperament').notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('temperaments');
};
