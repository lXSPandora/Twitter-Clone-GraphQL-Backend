// @flow

import mongoose from 'mongoose';

const TweetSchema = new mongoose.Schema(
  {
    userId: {
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
  },
);

export default mongoose.model('Tweet', TweetSchema);
