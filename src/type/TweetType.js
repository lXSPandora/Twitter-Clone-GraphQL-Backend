import { GraphQLObjectType, GraphQLString, GraphQLList } from 'graphql';
import { globalIdField } from 'graphql-relay';

import { NodeInterface } from '../interface/NodeInterface';
import UserType from './UserType';
import { UserLoader } from '../loader/';

export default new GraphQLObjectType({
  name: 'Tweet',
  description: 'Represents Tweet',
  fields: () => ({
    id: globalIdField('Tweet'),
    userId: {
      type: GraphQLString,
      description: 'User id of the owner',
      resolve: tweet => tweet.userId,
    },
    user: {
      type: UserType,
      description: 'user node',
      resolve: (tweet, args, context) => UserLoader.load(context, tweet.userId),
    },
    text: {
      type: GraphQLString,
      description: 'tweet body',
      resolve: tweet => tweet.text,
    },
    likes: {
      type: new GraphQLList(GraphQLString),
      description: 'tweet likes',
      resolve: tweet => tweet.likes,
    },
  }),
  interfaces: () => [NodeInterface],
});
