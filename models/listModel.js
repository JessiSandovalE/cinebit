const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ListSchema = new Schema({
  type: {
    type: String,
    require: true
  },
  recurse_id: {
    type: String,
    require: true
  }
});

const List = mongoose.model('list', ListSchema);

module.exports = List;