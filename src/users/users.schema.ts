import { gql } from "apollo-server-core";

export const usersSchema = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    username: String!
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
    currentUser: User
    user(id: ID!): User
    users: [User]!
  }

  input SignUpData {
    name: String!
    email: String!
    username: String!
    password: String!
  }

  type AuthResponse {
    user: User!
    token: String!
  }

  type Mutation {
    signUp(userData: SignUpData): AuthResponse!
    signIn(emailOrUsername: String!, password: String!): AuthResponse!
  }
`;
