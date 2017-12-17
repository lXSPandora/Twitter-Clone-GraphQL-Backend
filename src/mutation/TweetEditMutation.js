// @flow

import {
  GraphQLID,
  GraphQLString,
  GraphQLNonNull,
} from 'graphql';
import {
  mutationWithClientMutationId,
  fromGlobalId,
} from 'graphql-relay';

import Tweet from '../model/Tweet';

import TweetType from '../type/TweetType';
import TweetLoader from '../loader/TweetLoader';

export default mutationWithClientMutationId({
  name: 'TweetEdit',
  inputFields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    example: {
      type: GraphQLString,
    },
  },
  mutateAndGetPayload: async (args, context) => {
    const { user } = context;

    // Verify if user is authorized
    if (!user) {
      throw new Error('Unauthorized user');
    }

    const {
      id,
      example,
    } = args;

    // Check if the provided ID is valid
    const tweet = await Tweet.findOne({
      _id: fromGlobalId(id).id,
    });

    // If not, throw an error
    if (!tweet) {
      throw new Error('Invalid tweetId');
    }

    // TODO: mutation logic

    // Clear dataloader cache
    TweetLoader.clearCache(context, tweet._id);

    return {
      id: tweet._id,
      error: null,
    };
  },
  outputFields: {
    tweet: {
      type: TweetType,
      resolve: (obj, args, context) => TweetLoader.load(context, obj.id),
    },
    error: {
      type: GraphQLString,
      resolve: ({ error }) => error,
    },
  },
});
