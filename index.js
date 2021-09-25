const express = require('express');
const https = require('https');
const fs = require('fs');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const { verifyToken } = require('./helpers/getJWTToken');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

const startApolloServer = async () => {
  const db = `mongodb+srv://tubloko:eJiWCvx0uPZHJWuS@cluster0.tqfrv.mongodb.net/lmab?retryWrites=true&w=majority`;
  try {
    await mongoose.connect(db);
    console.log('MongoDB connected');
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      const token = req.headers.authorization || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNGYyYjlhZDQ4NmM3NDY0ZjdkNTM2NiIsIm5pY2tuYW1lIjoiUnVzbGFuIFNodWtpdXJvdiIsImlhdCI6MTYzMjU3OTgxNywiZXhwIjoxNjMyNjE1ODE3fQ.sxJSFCP6qSjPimSo0Hg5XViptcddpxoo33_sQCPQb8Q';
      const { id } = verifyToken(token);

      return { loggedIn: Boolean(id) };
    },
  });
  await server.start();

  const app = express();

  server.applyMiddleware({ app });

  const options = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
  };

  const httpsServer = https.createServer(options, app);
  await new Promise(resolve => {
    return httpsServer.listen({ port: 4000 }, resolve)
  });
  console.log(`🚀 Server ready at https://localhost:4000${server.graphqlPath}`);
  return { server, app };
};
startApolloServer();
