const { AuthenticationError } = require('apollo-server-express');
const { loginUser, registerUser, getUserByGoogleToken } = require('./../managers/authManager');
const { getUser } = require('./../managers/userManager');

module.exports = {
  Query: {
    getUser: async (parent, { id }, context) => {
      if (!context.loggedIn) {
        throw new AuthenticationError('You must be logged in');
      }
      const { _id, email, nickname, firstName, lastName } = await getUser({ id });

      return { user: { id: _id, email, nickname, firstName, lastName, token: context.token } };
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
          email: user.email,
          googleId: user.sub,
          nickname: user.name,
          firstName: user.given_name,
          lastName: user.family_name,
        }
      };
    },
    register: async (parent, { nickname, firstName, lastName, email, password, googleId, facebookId }) => {
      const user = await registerUser({ nickname, firstName, lastName, email, password, googleId, facebookId });
      return { user: { ...user, id: user._id } };
    },
  },
};
