import { ForbiddenError } from 'apollo-server-core';
import { DbClient } from './../../db/DbClient';
import { isAuth } from './../../middleware/isAuth';
import { ApolloError } from 'apollo-server-core';
import { IAppContext } from './../../shared/app.types';
export const deleteTweet = async (
  _parent: any,
  { tweetId }: { tweetId: string },
  { authToken, socket }: IAppContext
) => {
  const currentUser = await isAuth(authToken);

  const tweet = await DbClient.instance.tweet.findUnique({
    where: {
      id: tweetId,
    },
  });

  if (!tweet) return { message: 'tweet not found' };

  if (currentUser.id !== tweet.userId)
    throw new ForbiddenError('you are unauthorized to edit this tweet');

  const deletedTweet = await DbClient.instance.tweet.delete({
    where: {
      id: tweetId,
    },
    include: { user: true },
  });

  if (!deletedTweet) throw new ApolloError('Error Updating the tweet', '500');
  socket.emit('tweetDeleted', { tweet: deletedTweet });
  return deletedTweet;
};
