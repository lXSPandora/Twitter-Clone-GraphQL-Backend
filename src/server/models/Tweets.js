'use strict';

import mongoose from 'mongoose-fill';

const TweetsSchema = new mongoose.Schema(
  {
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
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
    collection: 'tweets',
  }
);

export default mongoose.model('Tweets', TweetsSchema);
