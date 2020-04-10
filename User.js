let { Model, snakeCaseMappers } = require('objection');
let Password = require('objection-password');

class User extends Password(Model) {
  static get columnNameMappers() {
    return snakeCaseMappers();
  }

  static get tableName() {
    return 'users';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: [
        'email',
        'password',
        'username'
      ],
      properties: {
        id: {type: 'integer'},
        email: {type: 'string'},
        password: {type: 'string'},
        username: {type: 'string'}
      }
    }
  }
}

module.exports = User;
