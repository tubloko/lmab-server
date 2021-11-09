const challengeRoomManager = require("../managers/challengeManager");

const pubsub = require('../pubsub');
const CHAT_CHANNEL = 'CHAT_CHANNEL';

module.exports =  {
  Query: {
    listChallengeRooms: async (root, args, context) => challengeRoomManager.getListChallengeRooms(),
    challengeRoom: async (root, { id }, context) => challengeRoomManager.getChallengeRoom(id),
  },

  Mutation: {
    createChallengeRoom: async (root, { title, description, author, userId }, context) => {
      return challengeRoomManager.createChallengeRoom({ title, description, author, userId });
    },
    updateChallengeRoom: async (root, { id, userId, from, message }, context) => {
      const sentMessage = await challengeRoomManager.updateChallengeRoom({ id, userId, from, message });
      await pubsub.publish(CHAT_CHANNEL, { messageSent: sentMessage });

      return sentMessage;
    }
  },

  Subscription: {
    messageSent: {
      subscribe: (root, args, context) => {
        return pubsub.asyncIterator(CHAT_CHANNEL);
      }
    }
  }
};
