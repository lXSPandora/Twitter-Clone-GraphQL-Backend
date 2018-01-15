// @flow

import { GraphQLString, GraphQLNonNull, GraphQLList, GraphQLObjectType } from 'graphql';
import { mutationWithClientMutationId, toGlobalId } from 'graphql-relay';

import { Tweet } from '../model';

import { TweetLoader } from '../loader';
import TweetConnection from '../connection/TweetConnection';

export default mutationWithClientMutationId({
  name: 'TweetAdd',
  inputFields: {
    userId: {
      type: GraphQLString,
      description: 'user id of the owner',
    },
    text: {
      type: GraphQLString,
      description: 'tweet body',
    },
    likes: {
      type: new GraphQLList(GraphQLString),
      description: 'tweet likes',
    },
  },
  mutateAndGetPayload: async ({ userId, text, likes }, { user }) => {
    // Verify if user is authorized
    if (!user) {
      throw new Error('Unauthorized user');
    }

    const tweet = new Tweet({
      userId,
      text,
      likes,
    });

    await tweet.save();

    const { id } = tweet;

    console.log(id);

    return {
      id,
      error: null,
    };
  },
  outputFields: {
    tweetEdge: {
      type: TweetConnection.edgeType,
      resolve: async ({ id }, args, context) => {
        // Load new edge from loader
        const tweet = await TweetLoader.load(context, id);

        // Returns null if no node was loaded
        if (!tweet) {
          return null;
        }

        return {
          cursor: toGlobalId('Tweet', tweet),
          node: tweet,
        };
      },
    },
    error: {
      type: GraphQLString,
      resolve: ({ error }) => error,
    },
  },
});
