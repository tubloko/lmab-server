const { UserInputError } = require('apollo-server-express');

let challengeRooms = [
  { id: 'testId1', title: 'first challenge', description: 'first challenge description', author: 'me', userId: '123',
    messages: [
      {
        id: 'ID!1',
        userId: 'String!',
        author: 'String!',
        message: 'String!',
      },
    ],
  },
  { id: 'testId2', title: 'second challenge', description: 'second challenge description', author: 'someone', userId: '123',
    messages: [
      {
        id: 'ID!2',
        userId: 'String!',
        author: 'String!',
        message: 'String!',
      },
    ],
  },
];

const getListChallengeRooms = async () => challengeRooms;
const getChallengeRoom = async (id) => challengeRooms.find(item => item.id === id);

const createChallengeRoom = async ({ userId, title, description, author }) => {
  if (!userId || !title || !description || !author) {
    throw new UserInputError('Invalid data!');
  }
  challengeRooms = [ ...challengeRooms, { id: "123", userId, title, description, author, messages: [] } ];

  return { id: "123", userId, title, description, author };
}

const updateChallengeRoom = async ({ message: { userId, from, message }, id }) => {
  if (!userId || !from || !message || !id) {
    throw new UserInputError('Invalid data!');
  }

  challengeRooms = challengeRooms.map(item => {
    if (item.id === id) {
      return { ...item, messages: [ ...item.messages, { id: "messageId", userId, from, message } ] }
    }
    return item;
  });

  return challengeRooms.find(item => item.id === id);
}

module.exports = {
  createChallengeRoom,
  getListChallengeRooms,
  getChallengeRoom,
  updateChallengeRoom
}
