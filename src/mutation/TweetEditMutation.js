// @flow

import { GraphQLID, GraphQLString, GraphQLNonNull, GraphQLList } from 'graphql';
import { mutationWithClientMutationId, fromGlobalId } from 'graphql-relay';

import { Tweet } from '../model';

import TweetType from '../type/TweetType';
import { TweetLoader } from '../loader';

export default mutationWithClientMutationId({
  name: 'TweetEdit',
  inputFields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
      required: true,
    },
    likes: {
      type: new GraphQLList(GraphQLString),
      required: false,
    },
    title: {
      type: GraphQLString,
      required: false,
    },
    text: {
      type: GraphQLString,
      required: false,
    },
  },
  mutateAndGetPayload: async (args, context) => {
    const { user } = context;

    // Verify if user is authorized
    if (!user) {
      throw new Error('Unauthorized user');
    }

    const {
      id, likes, title, text,
    } = args;

    const tweet = await Tweet.findOne({
      _id: fromGlobalId(id).id,
    });

    if (!tweet) {
      throw new Error('Invalid tweetId');
    }
    // checking fields and updating
    if (likes) {
      await tweet.update({
        likes,
      });
    }

    if (title) {
      await tweet.update({
        title,
      });
    }

    if (text) {
      await tweet.update({
        text,
      });
    }

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
