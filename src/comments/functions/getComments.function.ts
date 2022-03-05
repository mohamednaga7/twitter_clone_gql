import { IAddCommentDTO } from './../comments.types';
import { DbClient } from './../../db/DbClient';
import { isAuth } from './../../middleware/isAuth';
import { ApolloError } from 'apollo-server-core';
import { IAppContext } from './../../shared/app.types';
import graphqlFields from 'graphql-fields';
import { fieldsToQuery } from '../../shared/fieldsToQuery';

export const getComments = async (
  _parent: any,
  { tweetId }: { tweetId: string },
  _ctx: IAppContext,
  info: any
) => {
  const tweet = await DbClient.instance.tweet.findFirst({
    where: {
      AND: [{ id: tweetId }, { deletedAt: null }],
    },
    select: {
      id: true,
    },
  });

  if (!tweet) throw new ApolloError('Tweet Not Found', '404');

  const fields = graphqlFields(info);

  const comments = await DbClient.instance.comment.findMany({
    where: {
      AND: [{ tweetId }, { deletedAt: null }],
    },
    ...fieldsToQuery(fields),
  });

  return comments;
};
