const { loginUser, registerUser } = require('./../managers/authManager');
const { throwUserInputError } = require('./../helpers/handleErrors');

module.exports = {
  Mutation: {
    login: (_, { name, password }) => {
      const user = loginUser({ name, password });

      if (!user) throwUserInputError({ message: 'Invalid password or name', data: { name, password } });
      return user;
    },
    register: (_, { name, password, email }) => {
      const user = registerUser({ name, password, email });
      if (!user) throwUserInputError({ message: 'Fields should not be empty', data: { name, password, email } });

      return user;
    }
  }
};
