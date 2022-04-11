const fetch = require('node-fetch');
const { getJWTToken } = require('./../helpers/getJWTToken');
const { md5 } = require('../helpers/createHash');
const User = require('../models/User');
const { UserInputError } = require('apollo-server-express');

const loginUser = async ({ email, password }) => {
  const res = await User.findOne({ email });
  const user = res.toJSON();
  if (!user) {
    throw new UserInputError('Invalid email');
  }
  if (user.password !== md5(password)) {
    throw new UserInputError('Invalid password');
  }

  const { name, _id } = user;
  const token = getJWTToken({ name, id: _id });

  return { ...user, id: _id, token };
}
const registerUser = async ({ googleId, name, password, email }) => {
  if (!password || !email || !name) return { message: 'Data is missed' };

  let user;
  try {
    user = await User.create({ googleId, name, password: md5(password), email });
  } catch (e) {
    throw new UserInputError(e.message);
  }
  const token = getJWTToken({ id: user.id, name });

  return { ...user.toJSON(), token };
}
const getUserByGoogleToken = async (accessToken) => {
  const response = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${accessToken}`);
  return await response.json();
}

module.exports = {
  loginUser,
  registerUser,
  getUserByGoogleToken,
}
