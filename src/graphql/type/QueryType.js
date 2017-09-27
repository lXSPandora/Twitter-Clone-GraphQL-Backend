// @flow

import { GraphQLObjectType, GraphQLList } from 'graphql';

import Tweet from './TweetType';
import TweetModel from '../../models/Tweet';

export default new GraphQLObjectType({
  name: 'Query',
  description: 'The root of all... queries',
  fields: () => ({
    getTweet: {
    	type: Tweet,
    	resolve: (_, { _id }) => TweetModel.findById(_id),
    },
  	getTweets: {
  		type: new GraphQLList(Tweet),
  		resolve: () => TweetModel.find({}).sort({ createdAt: -1 }),
  	}
  }),
});
