// @flow

import mongoose from 'mongoose';

const TweetSchema = new mongoose.Schema(
  {
    username: {
      type: String,
    },
    userImage: {
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
  },
);

export default mongoose.model('Tweet', TweetSchema);
