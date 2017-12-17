// @flow

import { nodeDefinitions, fromGlobalId } from 'graphql-relay';

import User from '../loader/UserLoader';
import Tweet from '../loader/TweetLoader';
import { UserLoader, TweetLoader } from '../loader';

import QueryType from '../type/QueryType';
import UserType from '../type/UserType';
import TweetType from '../type/TweetType';

const { nodeField, nodeInterface } = nodeDefinitions(
  // A method that maps from a global id to an object
  async (globalId, context) => {
    const { id, type } = fromGlobalId(globalId);

    // console.log('id, type: ', type, id, globalId);
    if (type === 'User') {
      return await UserLoader.load(context, id);
    }

    if (type === 'Tweet') {
      return await TweetLoader.load(context, id);
    }
  },
  // A method that maps from an object to a type
  (obj) => {
    // console.log('obj: ', typeof obj, obj.constructor);
    if (obj instanceof User) {
      return UserType;
    }
    if (obj instanceof Tweet) {
      return TweetType;
    }
  },
);

export const NodeInterface = nodeInterface;
export const NodeField = nodeField;
