const fetch = require('node-fetch');
const { getJWTToken } = require('./../helpers/getJWTToken');
const { md5 } = require('../helpers/createHash');
const User = require('../models/User');
const { UserInputError } = require('apollo-server-express');

const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new UserInputError('Invalid email');
  }
  if (user.password !== md5(password)) {
    throw new UserInputError('Invalid password');
  }
  const { nickname, _id } = user._doc;
  const token = getJWTToken({ nickname, id: _id });

  return { ...user._doc, id: _id, token };
}
const registerUser = async ({ googleId, facebookId, firstName, lastName, nickname, password, email }) => {
  if (!password || !email || !nickname) return { message: 'Data is missed' };

  let user;
  try {
    user = await User.create({ googleId, facebookId, firstName, lastName, nickname, password: md5(password), email });
  } catch (e) {
    throw new UserInputError(e.message);
  }
  const token = getJWTToken({ id: user.id, nickname });

  return { ...user._doc, token };
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
