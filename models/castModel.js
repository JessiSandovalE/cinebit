const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const castSchema = new Schema({
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

const Detail = mongoose.model('detail', DetailSchema);

module.exports = Detail;