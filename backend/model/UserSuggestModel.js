const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  question: {
    type: String,
    required: true,  // Making the question field required
    trim: true,      // Trimming extra spaces
  },
  answer: {
    type: String,
    required: true,  // Making the answer field required
    trim: true,      // Trimming extra spaces
  },
  remarks: {
    type: String,
    required: true,  // Making the remarks field required
    trim: true,      // Trimming extra spaces
  },
  username: {
    type: String,
    required: true,  // Making the username field required
    trim: true,      // Trimming extra spaces
  }
});

const Query = mongoose.model('Query', schema);

module.exports = Query;
