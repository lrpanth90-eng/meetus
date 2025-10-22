const mongoose = require('mongoose');

const watchLaterSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  videos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Video' }],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('WatchLater', watchLaterSchema);
