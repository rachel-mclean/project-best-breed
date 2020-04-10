var express = require('express');
var router = express.Router();

let Breed = require('../models/Breed');
let Temperament = require('../models/Temperament');
let Relation = require('../models/Relation');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('main');
});

router.post('/preferences', async (req, res, next) => {
  let preferences = req.query;

  // Code to gather breeds from database, sort and present to user
  let allBreeds = await Breed.query();

  for (let each of allBreeds) {
    each['temperaments'] = await Relation.query()
      .select('temperaments.temperament')
      .join('temperaments', 'temperaments.id', 'relations.temperament_id')
      .where('breed_id', each.id);
  }


  res.render('main', {results});
})

module.exports = router;
