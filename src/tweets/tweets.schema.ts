import { gql } from 'apollo-server-core';

export const tweetsSchema = gql`
  type Tweet_Count {
    likes: Int
    comments: Int
  }

  type Tweet {
    id: ID!
    text: String!
    createdAt: String!
    updatedAt: String!
    userId: String!
    deletedAt: String
    user: User!
    comments: [Comment]!
    likes: [Like]!
    _count: Tweet_Count
  }

  type Like {
    id: ID!
    userId: String!
    user: User!
    tweetId: String!
    tweet: Tweet!
    createdAt: String!
  }

  type Query {
    tweets: [Tweet]!
    tweet(tweetId: ID!): Tweet!
  }

  type Mutation {
    addTweet(text: String!): Tweet!
    editTweet(tweetId: String!, text: String!): Tweet!
    deleteTweet(tweetId: String!): Tweet!

    toggleLikeTweet(tweetId: String!): Tweet!
  }
`;
