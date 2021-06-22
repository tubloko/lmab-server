const { ApolloServer } = require('apollo-server');
const { AuthenticationError } = require('apollo-server-errors');

const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
//todo move into managers
const getUser = () => ({});

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers.authorization || '';
    const user = getUser(token);
    //todo move into resolvers
    if (!user) throw new AuthenticationError('you must be logged in');
    return user;
  }
});
server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
