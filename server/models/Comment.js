const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

const Comment = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    require: true,
    ref: 'User'
  },
  project: {
    type: Schema.Types.ObjectId,
    require: true,
    ref: 'Project'
  },
  progress: {
    type: Schema.Types.ObjectId,
    ref: 'Progress'
  },
  content: String,
  tags: {
    type: String,
    enum: ['advice', 'asset', 'comment']
  },
  votes: {
    type: Schema.Types.ObjectId,
    ref: 'Vote'
  },
  time : { type : Date, default: Date.now }
});

module.exports = mongoose.model( 'Comment', Comment );
