const { mergeResolvers } = require('@graphql-tools/merge');
const productResolver = require('./usersResolver');
const challengeRooms = require('./chanllengeRoomResolver');

const resolvers = [
  productResolver,
  challengeRooms,
];

module.exports = mergeResolvers(resolvers);
