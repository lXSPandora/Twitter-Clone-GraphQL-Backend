// @flow

import { GraphQLObjectType, GraphQLString, GraphQLInt } from 'graphql';
import { globalIdField } from 'graphql-relay';

export default new GraphQLObjectType({
  name: 'Tweet',
  description: 'Represents a Tweet',
  fields: () => ({
    id: globalIdField('Tweet'),
    user: {
      type: GraphQLString,
      description: 'user',
      resolve: obj => obj.user,
    },
    text: {
      type: GraphQLString,
      description: 'text',
      resolve: obj => obj.text,
    },
    like: {
      type: GraphQLInt,
      description: 'like',
      resolve: obj => obj.like,
    },
  }),
});