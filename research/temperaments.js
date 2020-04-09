let loadBreeds = require('./loadBreeds');

let breeds = loadBreeds('../allBreeds.json');

let firstDog = breeds[0];


let allTemperaments = [];

for (let breed of breeds) {
  if (breed.temperament) {
    for (let each of breed.temperament.split(', ').map(attr => attr.toLowerCase())) {
      if (!allTemperaments.includes(each)) {
        allTemperaments.push(each);
      }
    }
  }
}

allTemperaments = allTemperaments.sort();

console.log(allTemperaments);
