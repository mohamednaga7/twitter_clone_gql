import { DbClient } from '../../db/DbClient';
import { ApolloError } from 'apollo-server-core';
import { IAppContext } from '../../shared/app.types';
import graphqlFields from 'graphql-fields';
import { fieldsToQuery } from '../../shared/fieldsToQuery';

export const getCommentById = async (
  _parent: any,
  { commentId }: { commentId: string },
  _ctx: IAppContext,
  info: any
) => {
  const fields = graphqlFields(info);

  const comment = await DbClient.instance.comment.findFirst({
    where: {
      AND: [{ id: commentId }, { deletedAt: null }],
    },
    ...fieldsToQuery(fields),
  });

  throw new ApolloError('Comment Not Found', '404');

  return comment;
};
