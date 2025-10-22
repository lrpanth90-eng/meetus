const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  video: { type: mongoose.Schema.Types.ObjectId, ref: 'Video', required: true },
  watchedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('History', historySchema);
