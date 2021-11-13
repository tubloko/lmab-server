const mongoose = require('mongoose');

const challengeSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    author: String,
    userId: String,
    messages: [
      {
        from: String,
        userId: String,
        message: String,
      }
    ],
  },
  {
    timestamps: true,
  }
);

const Challenge = mongoose.model('Challenge', challengeSchema);
module.exports = Challenge;
