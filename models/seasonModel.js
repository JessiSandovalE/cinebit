const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SeasonSchema = new Schema({
  detailId: {
    type: String,
    require: true
  },
  season: {
    type: Number,
    require: true
  },
  air_date: {
    type: String,
    require: true
  },
  name: {
    type: String,
    require: true
  },
  overview: {
    type: String,
    require: true
  },
  poster_path: {
    type: String,
    require: true
  }
});

const Season = mongoose.model('season', SeasonSchema);

module.exports = Season;