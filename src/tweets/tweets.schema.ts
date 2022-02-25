import { gql } from "apollo-server-core";

export const tweetsSchema = gql`
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
    tweets: [Tweet!]!
    tweet(id: ID!): Tweet!
  }

  input NewTweet {
    text: String!
    userId: String!
  }

  type Mutation {
    addTweet(input: NewTweet!): Tweet!
    editTweet(tweetId: String!, text: String!): Tweet!
    deleteTweet(tweetId: String!): Tweet!

    toggleLikeTweet(tweetId: String!): String
  }
`;
