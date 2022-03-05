import { getComments } from './functions/getComments.function';
import { addComment } from './functions/addComment.function';
import { deleteComment } from './functions/deleteComment.function';
import { editComment } from './functions/editComment.function';
import { getCommentById } from './functions/getCommentById.function';

export default {
  Query: {
    comments: getComments,
    comment: getCommentById,
  },
  Mutation: {
    addComment,
    editComment,
    deleteComment,
  },
};
