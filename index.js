const { createServer } = require('http');
const { execute, subscribe } = require('graphql');
const { SubscriptionServer } = require('subscriptions-transport-ws');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const { verifyToken } = require('./helpers/getJWTToken');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
const cookie = require('cookie');

const startApolloServer = async () => {
  const db = `mongodb+srv://tubloko:cq8cmycab8WjB3jM@cluster0.tqfrv.mongodb.net/lmab?retryWrites=true&w=majority`;
  try {
    await mongoose.connect(db);
    console.log('MongoDB connected');
  } catch (error) {
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
    context: ({ req, res }) => {
      try {
        const parsedCookie = cookie.parse(req?.headers?.cookie);
        let token = '';
        if (parsedCookie?.user) {
          token = JSON.parse(parsedCookie.user).token;
        }
        const result = verifyToken(token);

        if (result.message === 'jwt expired') {
          res.clearCookie('user');
        }

        return { loggedIn: Boolean(result.id), token, userId: result.id, res };
      } catch (e) {
        return { error: 'OooOps...something went wrong with the user!', res };
      }
    },
  });
  await server.start();
  const corsOptions = {
    origin: 'http://localhost:3000',
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

  const PORT = 4000;
  httpServer.listen(PORT, () => {
    console.log(
      `🚀 Query endpoint ready at http://localhost:${PORT}${server.graphqlPath}`
    );
    console.log(
      `🚀 Subscription endpoint ready at ws://localhost:${PORT}${server.graphqlPath}`
    );
  });
};
startApolloServer();
