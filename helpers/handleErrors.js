const { UserInputError } = require('apollo-server');

module.exports = {
  throwUserInputError: ({ message, data }) => {
    throw new UserInputError(message, {...data})
  }
};
