const mongoose = require("mongoose");

const journalSchema = new mongoose.Schema({
  userId: String,
  ambience: String,
  text: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  analysis: {
    emotion: String,
    keywords: [String],
    summary: String
  }
});

module.exports = mongoose.model("Journal", journalSchema);