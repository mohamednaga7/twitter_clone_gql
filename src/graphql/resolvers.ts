import authResolvers from "../auth/auth.resolvers";
import commentsResolvers from "../comments/comments.resolvers";
import tweetsResolvers from "../tweets/tweets.resolvers";
import usersResolvers from "../users/users.resolvers";

export const resolvers = {
  Query: {
    ...authResolvers.Query,
    ...usersResolvers.Query,
    ...tweetsResolvers.Query,
    ...commentsResolvers.Query,
  },
  Mutation: {
    ...authResolvers.Mutation,
    ...usersResolvers.Mutation,
    ...tweetsResolvers.Mutation,
    ...commentsResolvers.Mutation,
  },
};
