const axios = require('axios');
const api_key = '1db99a01f06388d0d1807dab4c594264';

// Models
let List = require('../models/listModel');

// Controllers
let movies = require('../controllers/movies');
let detailController = require('../controllers/detailsController');
let castController = require('../controllers/castsController');
let seasonController = require('../controllers/seasonsController');
let episodesController = require('../controllers/episodesController');


let listsController = {}

listsController.getList = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      let list = await getAllList();
      resolve(list);
    } catch (error) {
      reject(error);
    }
  });
}


let getAllList = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      List.find((err, data) => {
        if (err) res.json(err);
        resolve(data);
      });
    } catch (error) {
      reject(error);
    }
  });
}


listsController.createDetails = async () => {
  return new Promise(async (resolve, reject) => {
    let list = await getAllList();
    let i = 0;
    for (l of list) {
      let movieData = await movies.getDetails({
        type: l.type,
        id: l.recurse_id
      });

      let creditData = await movies.getCredits({
        type: l.type,
        id: l.recurse_id
      })

      let trailerData = await movies.getVideo({
        type: l.type,
        id: l.recurse_id
      })

      let tr = '';
      let ge = '';

      if (trailerData.videos[0]) {
        tr = trailerData.videos[0].trailer;
      }

      if (movieData.genres[0]) {
        ge = movieData.genres[0].name
      }

      let body = {
        type: l.type,
        title: movieData.title,
        poster_path: movieData.poster_path,
        genres: ge,
        original_title: movieData.original_title,
        overview: movieData.overview,
        popularity: movieData.popularity,
        release_date: movieData.release_date,
        runtime: movieData.runtime,
        vote_average: movieData.vote_average,
        vote_count: movieData.vote_count,
        director: creditData.crew.director || '',
        profile_path: creditData.crew.profile_path,
        trailer: tr
      }
      let createD = await detailController.createDetail(body);


      for (cdc of creditData.cast) {
        let createC = await castController.create({
          detailId: createD.id,
          name: cdc.name,
          character: cdc.character,
          profile_path: cdc.profile_path
        });
      }


      if (l.type == 'tv') {
        let season = await movies.getSeason({
          type: l.type,
          id: l.recurse_id,
          season: 1
        });

        let sc = await seasonController.create({
          detailId: createD.id,
          season: season.season,
          air_date: season.air_date,
          name: season.name,
          overview: season.overview,
          poster_path: season.poster_path,
        });
        let j = 0;
        for (se of season.episodes) {
          let ce = await episodesController.create({
            seasonId: sc.id,
            episode_number: se.episode_number,
            air_date: se.air_date,
            name: se.name,
            overview: se.overview,
            poster_path: se.poster_path,
            vote_average: se.vote_average,
            vote_count: se.vote_count,
          })
        }

      }

      console.log(i++);
    }

    resolve({
      message: 'Registros creados'
    });

  })
}

module.exports = listsController;