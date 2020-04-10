let { Model, snakeCaseMappers } = require('objection');

class Relation extends Model {
  static get columnNameMappers() {
    return snakeCaseMappers();
  }

  static get tableName() {
    return 'relations';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: [
        'temperamentId',
        'breedId'
      ],
      properties: {
        id: {type: 'integer'},
        temperamentId: {type: 'integer'},
        breedId: {type: 'integer'}
      }
    }
  }
}

module.exports = Relation;
