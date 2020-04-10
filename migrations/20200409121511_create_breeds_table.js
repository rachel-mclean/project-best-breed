
exports.up = function(knex) {
  return knex.schema.createTable('breeds', (table) => {
    table.integer('id').primary();
    table.text('name').notNullable();
    table.text('bred_for');
    table.text('breed_group');
    table.text('life_span');
    table.integer('max_weight');
    table.integer('min_weight');
    table.integer('max_height');
    table.integer('min_height');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('breeds');
};
