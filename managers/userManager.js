const User = require('../models/User');

const getUser = async ({ id }) => User.findById(id);

module.exports = {
  getUser,
}
