const { AuthenticationError } = require('apollo-server-express');
const { loginUser, registerUser, getUserByGoogleToken } = require('./../managers/authManager');
const { getUser, onUserSubscribe, getListUsers } = require('./../managers/userManager');

module.exports = {
  Query: {
    getUser: async (parent, { id }, context) => {
      if (!context.loggedIn) {
        throw new AuthenticationError('You must be logged in');
      }
      const { _id, email, nickname, firstName, lastName, challengeRoomsIds } = await getUser({ id: context.userId });

      return { user: { id: _id, email, nickname, firstName, lastName, token: context.token, challengeRoomsIds } };
    },
    getListUsers: async (parent, _, context) => {
      if (!context.loggedIn) {
        throw new AuthenticationError('You must be logged in');
      }
      const listUsers = await getListUsers();

      return listUsers.map(({ _id, email, nickname, firstName, lastName }) => {
        return { id: _id, email, nickname, firstName, lastName, token: context.token };
      });
    }
  },
  Mutation: {
    login: async (parent, { email, password }) => {
      const user = await loginUser({ email, password });

      return { user };
    },
    signInWithGoogle: async (parent, { accessToken }) => {
      const user = await getUserByGoogleToken(accessToken);
      return {
        user: {
          name: user.name,
          email: user.email,
          googleId: user.sub,
        }
      };
    },
    register: async (parent, { name, email, googleId, password }) => {
      const user = await registerUser({ name, email, password, googleId });

      return { user: { ...user, id: user._id } };
    },
    onSubscribe: async (parent, { id, challengeRoomIds, challengeRoomId }) => {
      const user = await onUserSubscribe({ id, challengeRoomIds, challengeRoomId });

      return { user: { ...user } };
    },
    logout: () => {
      return { success: true };
    },
  },
};
