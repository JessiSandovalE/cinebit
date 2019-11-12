const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DetailSchema = new Schema({
  type: {
    type: String,
    require: true
  },
  title: {
    type: String,
    require: true
  },
  poster_path: {
    type: String,
    require: true
  },
  genres: {
    type: String,
    require: true
  },
  original_title: {
    type: String,
    require: true
  },
  overview: {
    type: String,
    require: true
  },
  popularity: {
    type: Number,
    require: true
  },
  release_date: {
    type: String,
    require: true
  },
  runtime: {
    type: Number,
    require: true
  },
  vote_average: {
    type: Number,
    require: true
  },
  vote_count: {
    type: Number,
    require: true
  },
  director: {
    type: String,
    require: true
  },
  profile_path: {
    type: String,
    require: true
  },
  trailer: {
    type: String,
    require: false
  },
  movie: String,
  favorite: {
    type: Boolean,
    require: true,
    default: 0
  }

});

const Detail = mongoose.model('detail', DetailSchema);

module.exports = Detail;