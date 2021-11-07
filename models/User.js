const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    nickname: String,
    firstName: String,
    lastName: String,
    challengeRoomsIds: [String],
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    googleId: String,
    facebookId: String,
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);
module.exports = User;
