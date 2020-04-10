const { Model, snakeCaseMappers } = require('objection');

class Breed extends Model {
  static get columnNameMappers() {
    return snakeCaseMappers();
  }

  static get tableName() {
    return 'breeds';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: [
        'name'
      ],
      properties: {
        id: {type: 'integer'},
        name: {type: 'string'},
        bredFor: {type: ['string', 'null']},
        breedGroup: {type: ['string', 'null']},
        lifeSpan: {type: ['string', 'null']},
        maxWeight: {type: ['integer', 'null']},
        minWeight: {type: ['integer', 'null']},
        maxHeight: {type: ['integer', 'null']},
        minHeight: {type: ['integer', 'null']},
        imageUrl: {type: ['string', 'null']}
      }
    }
  }
}

module.exports = Breed;
