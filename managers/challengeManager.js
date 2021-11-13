const { UserInputError } = require('apollo-server-express');
const Challenge = require('../models/Challenge');

const getListChallengeRooms = async () => Challenge.find();
const getChallengeRoom = async (id) => Challenge.findById(id);

const createChallengeRoom = async ({ userId, title, description, author }) => {
  if (!userId || !title || !description || !author) {
    throw new UserInputError('Invalid data!');
  }
  let challenge;
  try {
    challenge = await Challenge.create({ userId, title, description, author, messages: [] });
  } catch (e) {
    throw new UserInputError(e.message);
  }

  return { ...challenge._doc };
}

const updateChallengeRoom = async ({ message: { userId, from, message }, id }) => {
  if (!userId || !from || !message || !id) {
    throw new UserInputError('Invalid data!');
  }
  let currentChallenge;
  let updatedChallengeRoomResponse;
  let messages;
  try {
    currentChallenge = await getChallengeRoom(id);
    messages = [ ...currentChallenge._doc.messages, { userId, from, message } ];
    updatedChallengeRoomResponse = await Challenge.findOneAndUpdate({ _id: id }, { messages }, { new: true });
  } catch (e) {
    throw new Error(`something went wrong ${e.message}`);
  }

  return updatedChallengeRoomResponse;
}

module.exports = {
  createChallengeRoom,
  getListChallengeRooms,
  getChallengeRoom,
  updateChallengeRoom
}
