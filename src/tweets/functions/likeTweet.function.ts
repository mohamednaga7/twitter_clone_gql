import { ForbiddenError } from 'apollo-server-core';
import { DbClient } from './../../db/DbClient';
import { isAuth } from './../../middleware/isAuth';
import { ApolloError } from 'apollo-server-core';
import { IAppContext } from './../../shared/app.types';
import { fieldsToQuery } from '../../shared/fieldsToQuery';
import graphqlFields from 'graphql-fields';
export const toggleLikeTweet = async (
  _parent: any,
  { tweetId }: { tweetId: string },
  { authToken, socket }: IAppContext,
  info: any
) => {
  const currentUser = await isAuth(authToken);

  const tweet = await DbClient.instance.tweet.findFirst({
    where: {
      AND: [{ id: tweetId }, { deletedAt: null }],
    },
    select: {
      id: true,
      userId: true,
    },
  });

  if (!tweet) throw new ApolloError('Tweet Not Found', '404');

  const like = await DbClient.instance.like.findFirst({
    where: {
      AND: [{ userId: currentUser.id }, { tweetId: tweet.id }],
    },
    select: {
      id: true,
      userId: true,
    },
  });

  const fields = graphqlFields(info);

  const updatedTweet = await DbClient.instance.tweet.update({
    where: {
      id: tweetId,
    },
    data: {
      likes: like
        ? {
            delete: {
              id: like.id,
            },
          }
        : {
            create: {
              userId: currentUser.id,
            },
          },
    },
    ...fieldsToQuery(fields),
  });

  if (!updatedTweet) throw new ApolloError('Error Updating the tweet', '500');
  socket.emit('tweetUpdated', { tweet: updatedTweet });
  return updatedTweet;
};
