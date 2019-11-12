const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CastSchema = new Schema({
  detailId: {
    type: String,
    require: true
  },
  name: {
    type: String,
    require: true
  },
  character: {
    type: String,
    require: true
  },
  profile_path: {
    type: String,
    require: true
  }
});

const Cast = mongoose.model('cast', CastSchema);

module.exports = Cast;