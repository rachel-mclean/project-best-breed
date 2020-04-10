let loadBreeds = require('./research/loadBreeds');
let getAllTemperaments = require('./research/getAllTemperaments');

let { Model } = require('objection');
let Breed = require('./models/Breed');
let Temperament = require('./models/Temperament');
let Relation = require('./models/Relation');
let Knex = require('knex');

let dbConfig = require('./knexfile');
let knex = Knex(dbConfig[process.env.NODE_ENV]);
Model.knex(knex);

async function importRelations(breeds) {
  let relations = [];
  for (let breed of breeds.filter(each => each.temperament)) {
    let thisBreed = await Breed.query().where('name', breed.name);

    let temperamentList = breed.temperament.split(', ').map(theString => theString.toLowerCase()).map(word => word.replace('-',''));
    for (let each of temperamentList) {
      let entries = await Temperament.query().where('temperament', each);
      let entry = entries[0];
      console.log(entry);
      relations.push({
        temperamentId: entry.id,
        breedId: thisBreed[0].id
      });
    }
  }
  return await Relation.query().insertGraph(relations);
}

let breeds = loadBreeds('./allBreeds.json');
importRelations(breeds);
