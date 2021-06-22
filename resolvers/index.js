const { mergeResolvers } = require('@graphql-tools/merge');
const productResolver = require('./usersResolver');

const resolvers = [
  productResolver,
];

module.exports = mergeResolvers(resolvers);
