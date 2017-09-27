import { GraphQLSchema, GraphQLObjectType } from 'graphql';

import QueryType from './type/QueryType';
import MutationType from './type/MutationType';

export const schema = new GraphQLSchema({
  query: QueryType,
  // mutation: MutationType,
});
