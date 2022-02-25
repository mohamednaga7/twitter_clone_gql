import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer, gql } from "apollo-server-core";
import express from "express";
import http from "http";
import { resolvers } from "./graphql/resolvers";
import schemas from "./graphql/schemas";

const app = express();
const httpServer = http.createServer(app);

async function startApolloServer(typeDefs: any, resolvers: any) {
  const server = new ApolloServer({
    typeDefs: schemas,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();
  server.applyMiddleware({ app });
  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve)
  );
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

startApolloServer({}, resolvers);