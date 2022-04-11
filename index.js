require('dotenv').config();
const { createServer } = require('http');
const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const { execute, subscribe } = require('graphql');
const { SubscriptionServer } = require('subscriptions-transport-ws');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { ApolloServer } = require('apollo-server-express');
const { verifyToken } = require('./helpers/getJWTToken');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

const startApolloServer = async () => {
  try {
    await mongoose.connect(config.get('DB').url);
    console.log('MongoDB connected');
  } catch (error) {
    console.log(error);
    console.log(error.message);
    process.exit(1);
  }

  const app = express();
  const httpServer = createServer(app);

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });
  const server = new ApolloServer({
    schema,
    context: ({ req }) => {
      const result = verifyToken(req.headers.token);

      return { loggedIn: Boolean(result.id) };
    },
  });
  await server.start();
  const corsOptions = {
    origin: config.get('client').clientURL,
    credentials: true
  }
  server.applyMiddleware({ app, cors: corsOptions });

  SubscriptionServer.create(
    {
      schema,
      execute,
      subscribe,
    },
    { server: httpServer, path: server.graphqlPath }
  );

  const PORT = process.env.PORT || config.get('port');
  httpServer.listen(PORT, () => {
    console.log(
      `🚀 Query endpoint ready at ${PORT}${server.graphqlPath}`
    );
    console.log(
      `🚀 Subscription endpoint ready at ${PORT}${server.graphqlPath}`
    );
  });
};
startApolloServer();
