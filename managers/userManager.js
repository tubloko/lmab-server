const User = require('../models/User');
const { UserInputError } = require('apollo-server-express');

const getUser = async ({ id }) => User.findById(id);
const getListUsers = async () => User.find();

const onUserSubscribe = async ({ id, challengeRoomIds, challengeRoomId }) => {
  if (!id || !challengeRoomId) {
    throw new UserInputError('Invalid data');
  }

  try {
    await User.findOneAndUpdate({ _id: id }, { challengeRoomsIds: [ ...challengeRoomIds, challengeRoomId ] });
  } catch (e) {
    throw new Error(`Something went wrong...${e.message}`);
  }

  return { id, challengeRoomsIds: [ ...challengeRoomIds, challengeRoomId ] };
};

module.exports = {
  getUser,
  getListUsers,
  onUserSubscribe,
};
//617e78db9dc234df0c552ac3
