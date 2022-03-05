export interface IAddCommentDTO {
  text: string;
  tweetId: string;
}

export interface IEditCommentDTO {
  text: string;
  commentId: string;
}

export interface IDeleteCommentDTO {
  commentId: string;
}
