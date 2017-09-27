// @flow

import { GraphQLObjectType, GraphQLString, GraphQLNonNull } from 'graphql';

import Tweet from '../../models/Tweet';

export default new GraphQLObjectType({
  name: 'Mutation',
  description: 'The root of all... queries',
  fields: () => ({
  	createTweet: {
  		resolve: (_, args) => Tweet.create(args),
  	},
  	updateTweet: {
  		resolve: (_, { _id, ...rest }) => Tweet.findByIdAndUpdate(_id, rest, { new: true }),
  	},
  	deleteTweet: {
  		resolve: async (_, { _id }) => {
    		try {
	    	  await Tweet.findByIdAndRemove(_id);
		      return {
		        message: 'Delete Success!',
		      };
    		} catch (error) {
      		  throw error;
    		}
    	},
    }
  }),
});
