const { mergeTypeDefs } = require('@graphql-tools/merge');
const userTypeDefs = require('./userTypeDefs');
const challengeRoom = require('./challengeRoomTypeDefs');

const types = [
  userTypeDefs,
  challengeRoom
];

module.exports = mergeTypeDefs(types);
