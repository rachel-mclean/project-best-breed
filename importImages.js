let fetch = require('node-fetch');

let searchUrl = 'https://api.thedogapi.com/v1/images/search?has_breeds=true&limit=25'
let myAPIKey = 'ab25d54f-ba17-4763-a762-c903c003a62e';

let { Model } = require('objection');
let Breed = require('./models/Breed');
let Knex = require('knex');

let dbConfig = require('./knexfile');
let knex = Knex(dbConfig[process.env.NODE_ENV]);
Model.knex(knex);


async function getImages(url, apiKey) {
  let results = await fetch(url, {
    headers: {
      'x-api-key': apiKey
    }
  }).then(res => res.json()).catch(err => console.log(err));

  return results;
}

let run = async () => {
  let images = await getImages(searchUrl, myAPIKey);
  console.log(images);
}

// run();

// Scrape through the API to gather images
async function importImages() {
  let imagesWithBreed = [];
  let imageIdsRetrieved = [];
  let still = true;
  while(still) {
    let images = await getImages(searchUrl, myAPIKey);
    let newImages = images.filter(each => (!imageIdsRetrieved.includes(each.id)));
    if (newImages.length === 0) { // break loop if no new images
      still = false;
    } else {
      for (let each of newImages) {
        each['breedId'] = each.breeds[0].id;
        imagesWithBreed.push(each);
        imageIdsRetrieved.push(each.id);
      }
    }
  }

  console.log(imagesWithBreed);

  for (let each of imagesWithBreed) {
    await Breed.query().patchAndFetchById(each.breedId, {
      imageUrl: each.url
    });
  }
}

importImages();
