import { getComments } from './functions/getComments.function';
import { addComment } from './functions/addComment.function';
import { deleteComment } from './functions/deleteComment.function';
import { editComment } from './functions/editComment.function';

export default {
  Query: {
    comments: getComments,
  },
  Mutation: {
    addComment,
    editComment,
    deleteComment,
  },
};
