const mongoose = require('mongoose');
const { Schema } = mongoose;

const articleSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  uriName: {
    type: String,
    required: true
  },
  draft: {
    type: Boolean,
    required: false,
    default: false
  },
  content: {
    type: Object,
    required: true
  },
  thumbnailImagePath: {
    type: String,
    required: false
  },
  coverImagePath: {
    type: String,
    required: false
  },
  createdAt: {
    type: Date,
    required: true,
    default: new Date()
  },
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  updatedAt: {
    type: Date,
    default: null
  }
});

mongoose.model('Article', articleSchema);