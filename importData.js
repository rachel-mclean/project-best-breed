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

function processBreeds(data) {
  return data.map(processBreed);
}

function processBreed(breed) {
  let weightParts = breed.weight.imperial.split(' ');
  let heightParts = breed.height.imperial.split(' ');
  // let temperamentList;
  // if (breed.temperament) {
  //   temperamentList = breed.temperament.split(', ').map(theString => theString.toLowerCase()).map(word => word.replace('-', ''));
  // }

  return {
    id: breed.id,
    name: breed.name,
    // temperament: temperamentList,
    bredFor: breed.bred_for,
    lifeSpan: breed.life_span,
    breedGroup:breed.breed_group,
    maxWeight: (Number(weightParts[2]) ? Math.floor(Number(weightParts[2])) : null),
    minWeight: (Number(weightParts[0]) ? Math.floor(Number(weightParts[0])) : null),
    maxHeight: (Number(heightParts[2]) ? Math.floor(Number(heightParts[2])) : null),
    minHeight: (Number(heightParts[0]) ? Math.floor(Number(heightParts[0])) : null),
  };
}

async function importBreeds(data) {
  return await Breed.query().insertGraph(data);
}


async function importTemperaments(temperaments) {
  return await Temperament.query().insertGraph(temperaments.map(each => {
    return {
      temperament: each
    }
  }));
}

let breeds = loadBreeds('./allBreeds.json');
// let badBreeds = breeds.filter(d => (typeof d.temperament) != 'string' && d.temperament !== undefined)
let processedBreeds = processBreeds(breeds);

/* let badBreeds = processedBreeds.filter(d => (typeof d.maxHeight) != 'number' && d.maxHeight !== undefined);
console.log('---------BAD BREEDS----------');
for (let each of badBreeds) {
  console.log(typeof each.maxHeight);
} */


importBreeds(processedBreeds);


let allTemperaments = getAllTemperaments(breeds);
importTemperaments(allTemperaments);
