import { IEditCommentDTO } from './../comments.types';
import { DbClient } from '../../db/DbClient';
import { isAuth } from '../../middleware/isAuth';
import { ApolloError, ForbiddenError } from 'apollo-server-core';
import { IAppContext } from '../../shared/app.types';
import graphqlFields from 'graphql-fields';
import { fieldsToQuery } from '../../shared/fieldsToQuery';
export const editComment = async (
  _parent: any,
  { commentId, text }: IEditCommentDTO,
  { authToken, socket }: IAppContext,
  info: any
) => {
  const currentUser = await isAuth(authToken);

  const comment = await DbClient.instance.comment.findFirst({
    where: {
      AND: [{ id: commentId }, { deletedAt: null }],
    },
    select: {
      id: true,
      userId: true,
      deletedAt: true,
      tweet: {
        select: {
          deletedAt: true,
        },
      },
    },
  });

  if (!comment || comment.deletedAt)
    throw new ApolloError('Comment Not Found', '404');

  if (comment.tweet.deletedAt) throw new ApolloError('Tweet Not Found', '404');

  if (comment.userId !== currentUser.id)
    throw new ForbiddenError('Not Authorized');

  const fields = graphqlFields(info);

  const updatedComment = await DbClient.instance.comment.update({
    where: {
      id: comment.id,
    },
    data: {
      text,
    },
    ...fieldsToQuery(fields),
  });

  if (!updatedComment)
    throw new ApolloError('Error Updating the comment', '500');
  socket.emit('commentUpdated', { tweet: updatedComment });
  return updatedComment;
};
