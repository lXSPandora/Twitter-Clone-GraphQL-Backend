// @flow
import DataLoader from 'dataloader';
import { Tweet as TweetModel } from '../model';
import { connectionFromMongoCursor, mongooseLoader } from '@entria/graphql-mongoose-loader';

import type { ConnectionArguments } from 'graphql-relay';
import type { GraphQLContext } from '../TypeDefinition';

type TweetType = {
  id: string,
  _id: string,
  username: string,
  userImage: string,
  title: string,
  text: string,
  likes: Array<string>,
};

export default class Tweet {
  id: string;
  _id: string;
  username: string;
  userImage: string;
  title: string;
  text: string;
  likes: Array<string>;

  constructor(data: TweetType) {
    this.id = data.id;
    this._id = data._id;
    this.username = data.username;
    this.userImage = data.userImage;
    this.title = data.title;
    this.text = data.text;
    this.likes = data.likes;
  }
}

export const getLoader = () => new DataLoader(ids => mongooseLoader(TweetModel, ids));

const viewerCanSee = (viewer, data) =>
  // Anyone can see another user
  true;
export const load = async (context: GraphQLContext, id: string): Promise<?Tweet> => {
  if (!id) {
    return null;
  }

  const data = await context.dataloaders.TweetLoader.load(id);

  return viewerCanSee(context, data) ? new Tweet(data) : null;
};

export const clearCache = ({ dataloaders }: GraphQLContext, id: string) => dataloaders.TweetLoader.clear(id.toString());

export const loadTweets = async (context: GraphQLContext, args: ConnectionArguments) => {
  const tweets = TweetModel.find({});

  return connectionFromMongoCursor({
    cursor: tweets,
    context,
    args,
    loader: load,
  });
};
