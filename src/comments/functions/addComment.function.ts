import { IAddCommentDTO } from './../comments.types';
import { DbClient } from './../../db/DbClient';
import { isAuth } from './../../middleware/isAuth';
import { ApolloError } from 'apollo-server-core';
import { IAppContext } from './../../shared/app.types';
import graphqlFields from 'graphql-fields';
import { fieldsToQuery } from '../../shared/fieldsToQuery';
export const addComment = async (
  _parent: any,
  { tweetId, text }: IAddCommentDTO,
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
    },
  });

  if (!tweet) throw new ApolloError('Tweet Not Found', '404');

  const fields = graphqlFields(info);

  const comment = await DbClient.instance.comment.create({
    data: {
      text,
      userId: currentUser.id,
      tweetId: tweetId,
    },
    ...fieldsToQuery(fields),
  });

  if (!comment) throw new ApolloError('Error creating the comment', '500');
  socket.emit('commentCreated', { tweet: comment });
  return comment;
};
