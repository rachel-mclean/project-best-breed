let fs = require('fs');

function loadBreeds(file) {
  let text = fs.readFileSync(file, 'utf-8');
  return JSON.parse(text);
}

if (require.main === module) {
  console.log(loadBreeds('../allBreeds.json'));
}

module.exports = loadBreeds;
