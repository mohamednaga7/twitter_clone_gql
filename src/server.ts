import { IAppContext } from './shared/app.types';
import { io } from './realtime/Io';
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer, gql } from 'apollo-server-core';
import express from 'express';
import http from 'http';
import cors from 'cors';
import dotenv from 'dotenv';
if (process.env.NODE_ENV && process.env.NODE_ENV === 'development') {
  dotenv.config();
}
import { resolvers } from './graphql/resolvers';
import schemas from './graphql/schemas';

const app = express();
app.use(cors());

const httpServer = http.createServer(app);

async function startApolloServer(resolvers: any) {
  const socket = io(httpServer);
  const server = new ApolloServer({
    typeDefs: schemas,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    context: ({ req }): IAppContext => ({
      authToken: req.headers.authorization,
      socket,
    }),
  });
  await server.start();
  server.applyMiddleware({ app });
  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve)
  );
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

startApolloServer(resolvers);
