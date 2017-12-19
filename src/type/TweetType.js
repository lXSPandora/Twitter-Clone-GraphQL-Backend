import { GraphQLObjectType, GraphQLString, GraphQLList } from 'graphql';
import { globalIdField } from 'graphql-relay';

import { NodeInterface } from '../interface/NodeInterface';

export default new GraphQLObjectType({
  name: 'Tweet',
  description: 'Represents Tweet',
  fields: () => ({
    id: globalIdField('Tweet'),
    username: {
      type: GraphQLString,
      description: 'username of the tweet owner',
      resolve: tweet => tweet.username,
    },
    userImage: {
      type: GraphQLString,
      description: 'userImage of the tweet owner',
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
