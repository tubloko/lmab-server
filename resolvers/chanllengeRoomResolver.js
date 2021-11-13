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
      const res = await challengeRoomManager.createChallengeRoom({ title, description, author, userId });

      return { ...res, id: res._id };
    },
    sendMessage: async (root, { id, userId, from, message }, context) => {
      const result = await challengeRoomManager.updateChallengeRoom({ id, userId, from, message });
      const messages = result.messages.map(({ _id, userId, from, message }) => ({ id: _id, userId, from, message }));
      await pubsub.publish(CHAT_CHANNEL, { messageSent: { ...result._doc, id, messages } });

      return { ...result._doc, id, messages };
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
