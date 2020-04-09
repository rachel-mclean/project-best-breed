let { Model, snakeCaseMappers } = require('objection');

class Temperament extends Model {
  static get columnNameMappers() {
    return snakeCaseMappers();
  }

  static get tableName() {
    return 'temperaments';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: [
        'temperament'
      ],
      properties: {
        id: {type: 'integer'},
        temperament: {type: 'string'}
      }
    }
  }
}

module.exports = Temperament;
