const { AuthenticationError } = require('apollo-server-express');
const { loginUser, registerUser, getUserByGoogleToken } = require('./../managers/authManager');
const { getUser, onUserSubscribe, getListUsers } = require('./../managers/userManager');
const cookie = require('cookie');

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
    login: async (parent, { email, password }, { res }) => {
      const user = await loginUser({ email, password });
      res.setHeader(
        'Set-Cookie',
        cookie.serialize('user', JSON.stringify({ token: user.token, id: user.id, nickname: user.nickname })),
        { httpOnly: true, maxAge: 60 * 60 * 24 * 7 }
      );

      return { user };
    },
    signInWithGoogle: async (parent, { accessToken }) => {
      const user = await getUserByGoogleToken(accessToken);
      return {
        user: {
          email: user.email,
          googleId: user.sub,
          nickname: user.name,
          firstName: user.given_name,
          lastName: user.family_name,
        }
      };
    },
    register: async (parent, { nickname, firstName, lastName, email, password, googleId, facebookId }, { res }) => {
      const user = await registerUser({ nickname, firstName, lastName, email, password, googleId, facebookId });
      res.setHeader(
        'Set-Cookie',
        cookie.serialize('user', JSON.stringify({ token: user.token, id: user.id, nickname: user.nickname })),
        { httpOnly: true, maxAge: 60 * 60 * 24 * 7 }
      );

      return { user: { ...user, id: user._id } };
    },
    onSubscribe: async (parent, { id, challengeRoomIds, challengeRoomId }) => {
      const user = await onUserSubscribe({ id, challengeRoomIds, challengeRoomId });

      return { user: { ...user } };
    },
    logout: async (parent, { id, challengeRoomIds, challengeRoomId }, { res }) => {
      res.clearCookie('user');

      return { success: true };
    },
  },
};
