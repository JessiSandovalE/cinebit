const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DetailSchema = new Schema({
  detailId: {
    type: String,
    require: true
  },
  episode_number: {
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
  },
  vote_average: {
    type: Number,
    require: true
  },
  vote_count: {
    type: Number,
    require: true
  }
});

const Detail = mongoose.model('detail', DetailSchema);

module.exports = Detail;