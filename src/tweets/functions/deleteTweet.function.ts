import { ForbiddenError } from 'apollo-server-core';
import { DbClient } from './../../db/DbClient';
import { isAuth } from './../../middleware/isAuth';
import { ApolloError } from 'apollo-server-core';
import { IAppContext } from './../../shared/app.types';
import graphqlFields from 'graphql-fields';
import { fieldsToQuery } from '../../shared/fieldsToQuery';
export const deleteTweet = async (
  _parent: any,
  { tweetId }: { tweetId: string },
  { authToken, socket }: IAppContext,
  info: any
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

  const fields = graphqlFields(info);

  const deletedTweet = await DbClient.instance.tweet.update({
    where: {
      id: tweetId,
    },
    data: {
      deletedAt: new Date(),
    },
    ...fieldsToQuery(fields),
  });

  if (!deletedTweet) throw new ApolloError('Error Deleting the tweet', '500');
  socket.emit('tweetDeleted', { tweet: deletedTweet });
  return deletedTweet;
};
