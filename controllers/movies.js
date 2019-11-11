// const mdb = require('moviedb')('1db99a01f06388d0d1807dab4c594264');
const MovieDb = require('moviedb-promise')
const moviedb = new MovieDb('1db99a01f06388d0d1807dab4c594264')
const axios = require('axios');
const api_key = '1db99a01f06388d0d1807dab4c594264';

let moviesController = {}

let tmdb = async (query) => {
  return new Promise(async (resolve, reject) => {
    try {
      let path = 'https://api.themoviedb.org/3';
      let ak = `api_key=${api_key}`;
      let language = 'language=es-ES';
      let data = await axios.get(`${path}/${query}?${ak}&${language}`);

      resolve(data);
    } catch (error) {
      reject('Error obteniendo la data' + error);
    }
  })
}



moviesController.getDetails = async (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Construimos query
      let query = `${req.type}/${req.id}`;
      // llamamos función para consultar data
      let data = await tmdb(query);
      // respuesta
      let d = data.data;
      let res = {
        id: d.id,
        title: d.title || d.name,
        poster_path: 'http://image.tmdb.org/t/p/w400' + d.poster_path,
        genres: d.genres,
        original_title: d.original_title,
        overview: d.overview,
        popularity: d.popularity,
        release_date: d.release_date || d.first_air_date,
        runtime: d.runtime,
        vote_average: d.vote_average,
        vote_count: d.vote_count
      }
      resolve(res);
    } catch (error) {
      reject('[Internal server error]' + error);
    }
  });
}

moviesController.getCredits = async (req) => {
  return new Promise(async (resolve, reject) => {
    try {

      if (req.type == 'movie') {
        let res = await creditsMovie(req);
        resolve(res);
      } else if (req.type == 'tv') {
        let res = await creditsTv(req);
        resolve(res);
      } else {
        resolve({
          message: 'Type not found'
        })
        return
      }

      resolve(d);
    } catch (error) {
      reject('[Internal server error]' + error);
    }
  });
}

let creditsMovie = async (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Construimos query
      let query = `${req.type}/${req.id}/credits`;
      // llamamos función para consultar data
      let data = await tmdb(query);
      // respuesta
      let d = data.data;
      let cast = [];

      for (let i = 0; i < 5; i++) {
        cast.push({
          name: i.name = d.cast[i].name,
          character: i.character = d.cast[i].character,
          profile_path: i.profile_path = 'http://image.tmdb.org/t/p/w400' + d.cast[i].profile_path
        });
      }
      let director;
      let profile_path;
      for (c of d.crew) {
        if (c.job == 'Director') {
          director = c.name;
          profile_path = 'http://image.tmdb.org/t/p/w400' + c.profile_path;
        }
      }

      let res = {
        id: d.id,
        crew: {
          director,
          profile_path
        },
        cast
      }

      resolve(res);
    } catch (error) {
      reject('[Internal server error]' + error);
    }
  })
}

let creditsTv = async (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Construimos query
      let query = `${req.type}/${req.id}`;
      let query2 = `${req.type}/${req.id}/credits`;
      // llamamos función para consultar data
      let details = await tmdb(query);
      let credits = await tmdb(query2);
      // respuesta
      let d = details.data;
      let c = credits.data;

      let cast = [];

      for (let i = 0; i < 5; i++) {
        cast.push({
          name: i.name = c.cast[i].name,
          character: i.character = c.cast[i].character,
          profile_path: i.profile_path = 'http://image.tmdb.org/t/p/w400' + c.cast[i].profile_path
        });
      }

      let res = {
        id: d.id,
        crew: {
          director: d.created_by[0].name,
          profile_path: 'http://image.tmdb.org/t/p/w400' + d.created_by[0].profile_path
        },
        cast
      }

      resolve(res);
    } catch (error) {
      reject('[Internal server error]' + error);
    }
  });
}

moviesController.getVideo = async (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Construimos query
      let query = `${req.type}/${req.id}/videos`;
      // llamamos función para consultar data
      let data = await tmdb(query);
      // respuesta
      let d = data.data;
      let videos = [];

      for (video of d.results) {
        videos.push({
          trailer: `https://www.youtube.com/watch?v=${video.key}`
        });
      }

      resolve({
        id: d.id,
        videos
      });
    } catch (error) {
      reject('[Internal server error]' + error);
    }
  });
}


moviesController.getSeason = async (req) => {
  return new Promise(async (resolve, reject) => {
    try {

      if (req.type == 'movie') {
        resolve({
          message: 'Type error, only tv has season'
        })
        return;
      }

      // Construimos query
      let query = `${req.type}/${req.id}/season/${req.season}`;
      // llamamos función para consultar data
      let data = await tmdb(query);

      // respuesta
      let d = data.data;
      let episodes = [];

      for (episode of d.episodes) {
        episodes.push({
          episode_number: episode.episode_number,
          air_date: episode.air_date,
          name: episode.name,
          overview: episode.overview,
          poster_path: 'http://image.tmdb.org/t/p/w400' + episode.still_path,
          vote_average: episode.vote_average,
          vote_count: episode.vote_count
        });
      }

      let res = {
        season: d.season_number,
        air_date: d.air_date,
        name: d.name,
        overview: d.overview,
        poster_path: 'http://image.tmdb.org/t/p/w400' + d.poster_path,
        episodes
      }

      resolve(res)
    } catch (error) {
      reject('[Internal server error]' + error);
    }
  });
}


module.exports = moviesController;