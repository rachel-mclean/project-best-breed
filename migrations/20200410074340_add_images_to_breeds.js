
exports.up = function(knex) {
  return knex.schema.table('breeds', (table) => {
    table.text('image_url');
  });
};

exports.down = function(knex) {
  return knex.schema.table('breeds', (table) => {
    table.dropColumn('image_url');
  });
};
