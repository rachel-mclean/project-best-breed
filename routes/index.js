var express = require('express');
var router = express.Router();

let Breed = require('../models/Breed');
let Temperament = require('../models/Temperament');
let Relation = require('../models/Relation');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('main');
});

router.get('/find', async (req,res,next) => {

  let temperaments = await Temperament.query();

  res.render('main', { temperaments });
});



router.get('/preferences', async (req, res, next) => {
  let preferences = req.query;

  // Code to gather breeds from database, sort and present to user
  let allBreeds = await Breed.query();

  for (let each of allBreeds) {
    let breedTemps = await Relation.query()
      .select('temperaments.temperament')
      .leftJoin('temperaments', 'temperaments.id', 'relations.temperament_id')
      .where('breed_id', each.id);

    let temperamentList = [];
    for (let item of breedTemps) {
      temperamentList.push(item.temperament);
    }

    each['temperaments'] = temperamentList;
    each['matches'] = 0;
    for (let temp of temperamentList) {
      if (preferences.temperaments.includes(temp)) {
        each.matches += 1;
      }
    }
  }

  // Get top 10 dogs by matches
  let results = allBreeds.sort((breedA, breedB) => breedB.matches - breedA.matches).slice(0,10);

  console.log(results);
  console.log(preferences);

  res.render('main', {results});
})

module.exports = router;
