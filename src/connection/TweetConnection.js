// @flow

import { GraphQLInt } from 'graphql';

import { connectionDefinitions } from 'graphql-relay';

import TweetType from '../type/TweetType';

export default connectionDefinitions({
  name: 'Tweet',
  nodeType: TweetType,
  connectionFields: {
    count: {
      type: GraphQLInt,
    },
  },
});
