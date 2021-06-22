const { getJWTToken } = require('./../helpers/getJWTToken');
let { users } = require('./../db/index');

const loginUser = ({ password, name }) => {
  const user = users.find((data) => data.password === password);
  if (!user) return '';
  const { email, id } = user;
  const token = getJWTToken({ id, name });
  return { name, id, email, token };
}
const registerUser = ({ password, name, email }) => {
  if (!password || !name || !email) return '';
  users = [ ...users, { password, name, email, id: Date.now() } ];

  const token = getJWTToken({ id: users[users.length - 1].id, name });
  return { name, email, token, id: users[users.length - 1].id };
}

module.exports = {
  loginUser,
  registerUser
}
