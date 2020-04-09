let loadBreeds = require('./loadBreeds');


function getAllTemperaments(breeds) {
  let allTemperaments = [];
  for (let breed of breeds) {
    if (breed.temperament) {
      for (let each of breed.temperament.split(', ').map(attr => attr.toLowerCase()).map(word => word.replace('-',''))) {
        if (!allTemperaments.includes(each)) {
          allTemperaments.push(each);
        }
      }
    }
  }
  return allTemperaments.sort();
}

if (require.main === module) {
  console.log(getAllTemperaments(loadBreeds('../allBreeds.json')));
}

module.exports = getAllTemperaments;
