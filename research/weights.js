let fs = require('fs');

let text = fs.readFileSync('../allBreeds.json', 'utf-8');
let breeds = JSON.parse(text);

// console.log(breeds);

let firstDog = breeds[0];

let weight = firstDog.weight.imperial.split(' ');
weight.splice(1,1);
let minMax = weight.map(each => Number(each));
console.log('Weight: ', minMax);
