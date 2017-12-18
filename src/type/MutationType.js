// @flow

import { GraphQLObjectType } from 'graphql';

import LoginEmail from '../mutation/LoginEmailMutation';
import RegisterEmail from '../mutation/RegisterEmailMutation';
import ChangePassword from '../mutation/ChangePasswordMutation';
import TweetAdd from '../mutation/TweetAddMutation';
import TweetEdit from '../mutation/TweetEditMutation';

export default new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    // auth
    LoginEmail,
    RegisterEmail,
    ChangePassword,
    // tweet
    TweetAdd,
    TweetEdit,
  }),
});
