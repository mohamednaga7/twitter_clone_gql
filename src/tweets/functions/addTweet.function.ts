import { DbClient } from './../../db/DbClient';
import { isAuth } from './../../middleware/isAuth';
import { ApolloError } from 'apollo-server-core';
import { IAppContext } from './../../shared/app.types';
import { AddTweetDTO } from './../tweets.types';
export const addTweet = async (
  _parent: any,
  { text }: AddTweetDTO,
  { authToken, socket }: IAppContext
) => {
  const currentUser = await isAuth(authToken);

  const tweet = await DbClient.instance.tweet.create({
    data: {
      text,
      userId: currentUser.id,
    },
    include: {
      user: true,
    },
  });
  if (!tweet) throw new ApolloError('Error Creating the tweet', '500');
  socket.emit('tweetCreated', { tweet });
  return tweet;
};
