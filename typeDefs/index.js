const { mergeTypeDefs } = require('@graphql-tools/merge');
const userTypeDefs = require('./userTypeDefs');

const types = [
  userTypeDefs,
];

module.exports = mergeTypeDefs(types);
