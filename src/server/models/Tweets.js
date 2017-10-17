'use strict';

import mongoose from 'mongoose-fill';

const TweetsSchema = new mongoose.Schema({
  user: {
    type: String,
  },
  title: {
    type: String,
  },
  text: {
    type: String,
  },
  likes: {
    type: [String],
  },
});

export default mongoose.model('Tweets', TweetsSchema);
