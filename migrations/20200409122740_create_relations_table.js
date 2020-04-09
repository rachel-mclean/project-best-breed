
exports.up = function(knex) {
  return knex.schema.createTable('relations', (table) => {
    table.increments('id').primary();
    table.integer('temperament_id').references('temperaments.id');
    table.integer('breed_id').references('breeds.id');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('relations');
};
