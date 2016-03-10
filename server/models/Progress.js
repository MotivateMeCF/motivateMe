const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

const Progress = new Schema({
  content: {
    type: String,
    require: true
  },
  done: Boolean,
  time : { type : Date, default: Date.now }
});

module.exports = mongoose.model( 'Progress', Progress );
