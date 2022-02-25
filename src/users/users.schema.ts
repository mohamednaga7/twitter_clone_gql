import { gql } from "apollo-server-core";

export const usersSchema = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    username: String!
    password: String!
    profileImageUrl: String
    createdAt: String!
    updatedAt: String!
    deletedAt: String
    followedBy: [User]!
    following: [User]!
    tweets: [Tweet]!
    comments: [Comment]!
    likes: [Like]!
  }

  type Query {
    me: User
    user(id: ID!): User
    users: [User]!
  }

  type Mutation {
    addUser(id: Int!): String
  }
`;
