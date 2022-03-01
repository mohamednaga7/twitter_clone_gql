import { ForbiddenError } from 'apollo-server-core';
import { DbClient } from './../../db/DbClient';
import { isAuth } from './../../middleware/isAuth';
import { ApolloError } from 'apollo-server-core';
import { IAppContext } from './../../shared/app.types';
import { EditTweetDTO } from './../tweets.types';
export const editTweet = async (
  _parent: any,
  { tweetId, text }: EditTweetDTO,
  { authToken, socket }: IAppContext
) => {
  const currentUser = await isAuth(authToken);

  const tweet = await DbClient.instance.tweet.findUnique({
    where: {
      id: tweetId,
    },
  });

  if (!tweet) throw new ApolloError('Tweet Not Found', '404');

  if (currentUser.id !== tweet.userId)
    throw new ForbiddenError('you are unauthorized to edit this tweet');

  const updatedTweet = await DbClient.instance.tweet.update({
    where: {
      id: tweetId,
    },
    data: {
      text: text,
    },
    include: { user: true },
  });

  if (!updatedTweet) throw new ApolloError('Error Updating the tweet', '500');
  socket.emit('tweetUpdated', { tweet: updatedTweet });
  return updatedTweet;
};
