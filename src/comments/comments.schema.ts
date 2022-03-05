import { gql } from 'apollo-server-core';

export const commentsSchema = gql`
  type Comment {
    id: ID!
    text: String!
    userId: String!
    user: User!
    tweetId: String!
    tweet: Tweet!
    deletedAt: String
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    comments(tweetId: String!): [Comment]!
    comment(commentId: String!): Comment!
  }

  type Mutation {
    addComment(tweetId: String!, text: String!): Comment!
    editComment(commentId: String!, text: String!): Comment!
    deleteComment(commentId: String!): Comment!
  }
`;
