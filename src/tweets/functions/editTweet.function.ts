import { ForbiddenError } from 'apollo-server-core';
import { DbClient } from './../../db/DbClient';
import { isAuth } from './../../middleware/isAuth';
import { ApolloError } from 'apollo-server-core';
import { IAppContext } from './../../shared/app.types';
import { EditTweetDTO } from './../tweets.types';
import graphqlFields from 'graphql-fields';
import { fieldsToQuery } from '../../shared/fieldsToQuery';
export const editTweet = async (
  _parent: any,
  { tweetId, text }: EditTweetDTO,
  { authToken, socket }: IAppContext,
  info: any
) => {
  const currentUser = await isAuth(authToken);

  const tweet = await DbClient.instance.tweet.findFirst({
    where: {
      AND: [{ id: tweetId }, { deletedAt: null }],
    },
    select: {
      userId: true,
    },
  });

  if (!tweet) throw new ApolloError('Tweet Not Found', '404');

  const fields = graphqlFields(info);

  if (currentUser.id !== tweet.userId)
    throw new ForbiddenError('you are unauthorized to edit this tweet');

  const updatedTweet = await DbClient.instance.tweet.update({
    where: {
      id: tweetId,
    },
    data: {
      text: text,
    },
    ...fieldsToQuery(fields),
  });

  if (!updatedTweet) throw new ApolloError('Error Updating the tweet', '500');
  socket.emit('tweetUpdated', { tweet: updatedTweet });
  return updatedTweet;
};
